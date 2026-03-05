"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ShieldAlert, 
  Settings, 
  Activity, 
  Database, 
  Plus,
  Trash2,
  UserCog,
  Building,
  Filter,
  Lock,
  User as UserIcon,
  Map as MapIcon,
  AlertTriangle
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  subscribeSites,
  subscribeUsers,
  updateSite,
  deleteSite,
  deleteUsersForSite,
  updateUser,
  type Site,
  type User,
} from "@/lib/firestore";

const ROLES = ["Barista", "Head Baker", "Bakery Manager", "Shift Lead", "Super Admin"];
const STATUSES = ["Active", "Inactive"];

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [sites, setSites] = useState<Site[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [filterSite, setFilterSite] = useState("all");

  // Deletion State
  const [siteToDelete, setSiteToDelete] = useState<Site | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('provr_user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(storedUser);
    const hasAdminAccess = user.role === 'admin' || user.role === 'Super Admin' || user.role === 'Bakery Manager';

    if (!hasAdminAccess) {
      router.push('/');
      return;
    }

    setCurrentUser(user);
    if (user.role === 'Bakery Manager' && user.siteId) {
      setFilterSite(user.siteId);
    }

    setLoading(false);
  }, [router]);

  // Subscribe to Firestore once auth check passes
  useEffect(() => {
    if (loading) return;

    const unsubSites = subscribeSites(setSites);
    const unsubUsers = subscribeUsers(setUsers);

    return () => {
      unsubSites();
      unsubUsers();
    };
  }, [loading]);

  const isSuperAdmin = currentUser?.role === 'admin' || currentUser?.role === 'Super Admin';
  const isBakeryManager = currentUser?.role === 'Bakery Manager';

  const initiateDeleteSite = (site: Site) => {
    if (!isSuperAdmin) {
      toast({ variant: "destructive", title: "Access Denied", description: "Only Super Admins can manage sites." });
      return;
    }
    setSiteToDelete(site);
    setDeleteConfirmText("");
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!siteToDelete) return;

    if (deleteConfirmText !== `delete ${siteToDelete.name}`) {
      toast({ variant: "destructive", title: "Incorrect Confirmation", description: "The text entered does not match the required format." });
      return;
    }

    try {
      await deleteUsersForSite(siteToDelete.id, true);
      await deleteSite(siteToDelete.id);

      toast({
        title: "Site Removed",
        description: `The site "${siteToDelete.name}" and its associated staff (excluding Super Admins) have been deleted.`
      });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Failed to delete the site. Please try again." });
    }

    setIsDeleteDialogOpen(false);
    setSiteToDelete(null);
  };

  const handleUpdateSiteField = async (siteId: string, field: string, value: string) => {
    if (!isSuperAdmin) return;
    try {
      await updateSite(siteId, { [field]: value });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Failed to update site." });
    }
  };

  const handleUpdateUserField = async (userId: string, field: string, value: string) => {
    const targetUser = users.find(u => u.id === userId);

    if (targetUser?.username === 'tristenb' && field === 'status') {
      toast({ variant: "destructive", title: "Action Restricted", description: "The Super Admin account must remain active." });
      return;
    }

    if (isBakeryManager && targetUser?.siteId !== currentUser.siteId) {
      toast({ variant: "destructive", title: "Access Denied", description: "You can only manage staff at your site." });
      return;
    }

    try {
      await updateUser(userId, { [field]: value });
    } catch (err) {
      console.error(err);
      toast({ variant: "destructive", title: "Error", description: "Failed to update user." });
    }
  };

  const visibleUsers = isSuperAdmin
    ? users
    : users.filter(u => u.siteId === currentUser?.siteId);

  const filteredUsers = filterSite === "all"
    ? visibleUsers
    : visibleUsers.filter(u => u.siteId === filterSite);

  const visibleSites = isSuperAdmin
    ? sites
    : sites.filter(s => s.id === currentUser?.siteId);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Verifying credentials...</div>;
  }

  const expectedConfirmText = siteToDelete ? `delete ${siteToDelete.name}` : "";

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">
              {isSuperAdmin ? "Global Control Center" : `Site Management: ${visibleSites[0]?.name}`}
            </h1>
          </div>
          <p className="text-muted-foreground">
            {isSuperAdmin
              ? "Manage all bakery sites, staff credentials, and system configuration."
              : "Manage staff accounts and credentials for your specific location."}
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: "Active Users", value: visibleUsers.filter(u => u.status === "Active").length.toString(), icon: Users, color: "text-blue-500" },
            { label: isSuperAdmin ? "Bakery Sites" : "Current Site", value: visibleSites.length.toString(), icon: Building, color: "text-purple-500" },
            { label: "System Health", value: "Optimal", icon: Activity, color: "text-primary" },
            { label: "Storage Used", value: "14%", icon: Database, color: "text-orange-500" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-muted/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</p>
                  <p className="text-2xl font-headline font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="staff" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
            <TabsTrigger value="staff">Staff Management</TabsTrigger>
            {isSuperAdmin && <TabsTrigger value="sites">Site Management</TabsTrigger>}
          </TabsList>

          <TabsContent value="staff">
            <Card className="border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="font-headline">Employee Registry</CardTitle>
                    <CardDescription>
                      {isSuperAdmin
                        ? "Manage all staff across the organization"
                        : `Manage staff for ${visibleSites[0]?.name}`}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    {isSuperAdmin && (
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Select value={filterSite} onValueChange={setFilterSite}>
                          <SelectTrigger className="w-[180px] bg-background">
                            <SelectValue placeholder="Filter by Site" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sites</SelectItem>
                            {sites.map(s => (
                              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add Staff
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Username</TableHead>
                      <TableHead>PIN</TableHead>
                      {isSuperAdmin && <TableHead>Assigned Site</TableHead>}
                      <TableHead>Role</TableHead>
                      <TableHead>Account Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id} className={user.status === 'Inactive' ? 'opacity-60 bg-muted/10' : ''}>
                        <TableCell className="font-medium">
                          <div className="font-bold">{user.name}</div>
                          <div className="text-[10px] text-muted-foreground">{user.email}</div>
                        </TableCell>
                        <TableCell>
                          <div className="relative">
                            <UserIcon className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                            <Input
                              defaultValue={user.username}
                              onBlur={(e) => handleUpdateUserField(user.id, 'username', e.target.value)}
                              className="h-8 pl-7 text-xs w-[120px]"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="relative">
                            <Lock className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                            <Input
                              defaultValue={user.pin}
                              type="password"
                              maxLength={6}
                              onBlur={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 6) handleUpdateUserField(user.id, 'pin', val);
                              }}
                              className="h-8 pl-7 text-xs w-[80px] font-mono"
                            />
                          </div>
                        </TableCell>
                        {isSuperAdmin && (
                          <TableCell>
                            <Select
                              defaultValue={user.siteId}
                              onValueChange={(val) => handleUpdateUserField(user.id, 'siteId', val)}
                            >
                              <SelectTrigger className="h-8 w-[160px] bg-background text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {sites.map(s => (
                                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                ))}
                                <SelectItem value="unassigned">Unassigned / Global</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        )}
                        <TableCell>
                          <Select
                            defaultValue={user.role}
                            disabled={user.username === 'tristenb'}
                            onValueChange={(val) => handleUpdateUserField(user.id, 'role', val)}
                          >
                            <SelectTrigger className="h-8 w-[140px] bg-background text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {ROLES.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            defaultValue={user.status}
                            disabled={user.username === 'tristenb'}
                            onValueChange={(val) => handleUpdateUserField(user.id, 'status', val)}
                          >
                            <SelectTrigger className={`h-8 w-[110px] text-xs font-bold ${user.status === 'Active' ? 'text-green-600' : 'text-destructive'}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {STATUSES.map(status => (
                                <SelectItem key={status} value={status}>
                                  <Badge variant={status === 'Active' ? 'default' : 'secondary'} className="text-[10px] w-full justify-center">
                                    {status}
                                  </Badge>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {isSuperAdmin && (
            <TabsContent value="sites">
              <Card className="border-none shadow-xl overflow-hidden">
                <CardHeader className="bg-muted/30">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle className="font-headline">Site Registry</CardTitle>
                      <CardDescription>Manage all bakery and cafe locations and their teams</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" /> Add New Site
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Bakery Name</TableHead>
                        <TableHead>Location Address</TableHead>
                        <TableHead>Primary Manager</TableHead>
                        <TableHead>Staff Count</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sites.map((site) => (
                        <TableRow key={site.id}>
                          <TableCell>
                            <div className="relative">
                              <Building className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                              <Input
                                defaultValue={site.name}
                                onBlur={(e) => handleUpdateSiteField(site.id, 'name', e.target.value)}
                                className="h-8 pl-7 text-xs font-bold w-[200px]"
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="relative">
                              <MapIcon className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                              <Input
                                defaultValue={site.location}
                                onBlur={(e) => handleUpdateSiteField(site.id, 'location', e.target.value)}
                                className="h-8 pl-7 text-xs w-[250px]"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{site.manager}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px]">
                              {users.filter(u => u.siteId === site.id).length} Staff
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => initiateDeleteSite(site)}
                                title="Delete site and associated team"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>

        {isSuperAdmin && (
          <section className="mt-12">
            <Card className="border-none shadow-xl bg-foreground text-background">
              <CardHeader>
                <CardTitle className="font-headline text-lg text-white">System Maintenance</CardTitle>
                <CardDescription className="text-muted-foreground">Advanced configuration and diagnostic tools.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                    <UserCog className="mr-2 h-4 w-4" /> Global Permissions Reset
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                    <Activity className="mr-2 h-4 w-4" /> System Audit Logs
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                    <Database className="mr-2 h-4 w-4" /> Export System Data
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <ShieldAlert className="mr-2 h-4 w-4" /> Enter Maintenance Mode
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      {/* Irreversible Deletion Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div className="flex items-center gap-2 text-destructive mb-2">
              <AlertTriangle className="h-6 w-6" />
              <AlertDialogTitle className="font-headline text-xl">Irreversible Action</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="space-y-4">
              <p className="font-bold text-foreground">
                You are about to delete the site <span className="underline">"{siteToDelete?.name}"</span> and its team.
              </p>
              <p>
                This action cannot be undone. Associated staff accounts will be removed, <span className="font-bold italic">except for Super Admins</span> who retain system access.
              </p>
              <div className="pt-4 space-y-3">
                <Label htmlFor="delete-confirm" className="text-xs font-bold uppercase text-muted-foreground">
                  Type <code className="bg-muted px-1 py-0.5 rounded text-destructive">{expectedConfirmText}</code> to confirm
                </Label>
                <Input
                  id="delete-confirm"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder={`Type "${expectedConfirmText}"`}
                  className="border-destructive focus-visible:ring-destructive"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText !== expectedConfirmText}
            >
              Confirm Deletion
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
