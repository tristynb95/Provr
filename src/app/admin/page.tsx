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
  MapPin,
  Plus,
  Trash2,
  UserCog,
  Building,
  Filter,
  Lock,
  User as UserIcon
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const INITIAL_SITES = [
  { id: "s1", name: "Downtown Bakery", location: "123 Main St", manager: "Jack Thompson" },
  { id: "s2", name: "Northside Cafe", location: "456 High St", manager: "Sarah Miller" },
  { id: "s3", name: "East End Pastries", location: "789 Park Rd", manager: "Tristen B." },
];

const INITIAL_USERS = [
  { id: "u1", name: "Tristen Bayley", username: "tristenb", pin: "000000", role: "Super Admin", siteId: "s3", status: "Active", email: "tristen@provr.com" },
  { id: "u2", name: "Sarah Miller", username: "sarahm", pin: "123456", role: "Head Baker", siteId: "s2", status: "Active", email: "sarah@provr.com" },
  { id: "u3", name: "Alex Baker", username: "alexb", pin: "111111", role: "Barista", siteId: "s1", status: "Active", email: "alex@provr.com" },
  { id: "u4", name: "Jack Thompson", username: "jackt", pin: "222222", role: "Store Manager", siteId: "s1", status: "Inactive", email: "jack@provr.com" },
];

const ROLES = ["Barista", "Head Baker", "Store Manager", "Shift Lead", "Super Admin"];
const STATUSES = ["Active", "Inactive"];

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState(INITIAL_SITES);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [filterSite, setFilterSite] = useState("all");

  useEffect(() => {
    const storedUser = localStorage.getItem('provr_user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const user = JSON.parse(storedUser);
    if (user.role !== 'admin') {
      router.push('/');
      return;
    }
    
    setLoading(false);
  }, [router]);

  const handleDeleteSite = (id: string) => {
    setSites(sites.filter(s => s.id !== id));
    toast({ title: "Site removed", description: "The location has been deleted from the registry." });
  };

  const updateUserField = (userId: string, field: string, value: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, [field]: value } : u));
    toast({ title: "Staff updated", description: `Updated ${field} for member.` });
  };

  const filteredUsers = filterSite === "all" 
    ? users 
    : users.filter(u => u.siteId === filterSite);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Verifying credentials...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <ShieldAlert className="h-8 w-8 text-primary" />
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground">Admin Control Center</h1>
          </div>
          <p className="text-muted-foreground">Manage sites, staff credentials, and system configuration.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: "Active Users", value: users.filter(u => u.status === "Active").length.toString(), icon: Users, color: "text-blue-500" },
            { label: "Bakery Sites", value: sites.length.toString(), icon: Building, color: "text-purple-500" },
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
            <TabsTrigger value="sites">Site Management</TabsTrigger>
          </TabsList>

          <TabsContent value="staff">
            <Card className="border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="font-headline">Employee Registry</CardTitle>
                    <CardDescription>Manage staff accounts, site assignments, and security PINs</CardDescription>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto">
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
                      <TableHead>Assigned Site</TableHead>
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
                              value={user.username} 
                              onChange={(e) => updateUserField(user.id, 'username', e.target.value)}
                              className="h-8 pl-7 text-xs w-[120px]"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="relative">
                            <Lock className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                            <Input 
                              value={user.pin} 
                              type="password"
                              maxLength={6}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                if (val.length <= 6) updateUserField(user.id, 'pin', val);
                              }}
                              className="h-8 pl-7 text-xs w-[80px] font-mono"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select 
                            defaultValue={user.siteId} 
                            onValueChange={(val) => updateUserField(user.id, 'siteId', val)}
                          >
                            <SelectTrigger className="h-8 w-[160px] bg-background text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {sites.map(s => (
                                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select 
                            defaultValue={user.role} 
                            onValueChange={(val) => updateUserField(user.id, 'role', val)}
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
                            onValueChange={(val) => updateUserField(user.id, 'status', val)}
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
                {filteredUsers.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    No staff found at this location.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sites">
            <Card className="border-none shadow-xl overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle className="font-headline">Site Registry</CardTitle>
                    <CardDescription>Manage your bakery and cafe locations</CardDescription>
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
                      <TableHead>Location</TableHead>
                      <TableHead>Primary Manager</TableHead>
                      <TableHead>Staff Count</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sites.map((site) => (
                      <TableRow key={site.id}>
                        <TableCell className="font-bold">{site.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs">
                            <MapPin className="h-3 w-3" />
                            {site.location}
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
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteSite(site.id)}
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
        </Tabs>

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
      </main>
    </div>
  );
}