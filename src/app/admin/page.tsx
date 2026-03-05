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
  MessageSquare,
  AlertTriangle,
  FileText,
  MapPin,
  Plus,
  Trash2,
  UserCog,
  Building
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
  { id: "u1", name: "Tristen B.", role: "Super Admin", siteId: "s3", status: "Active", email: "tristen@provr.com" },
  { id: "u2", name: "Sarah Miller", role: "Head Baker", siteId: "s2", status: "Active", email: "sarah@provr.com" },
  { id: "u3", name: "Alex Baker", role: "Barista", siteId: "s1", status: "On Shift", email: "alex@provr.com" },
  { id: "u4", name: "Jack Thompson", role: "Store Manager", siteId: "s1", status: "Away", email: "jack@provr.com" },
];

const ROLES = ["Barista", "Head Baker", "Store Manager", "Shift Lead", "Super Admin"];

export default function AdminPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [sites, setSites] = useState(INITIAL_SITES);
  const [users, setUsers] = useState(INITIAL_USERS);

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

  const updateUserRole = (userId: string, newRole: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
    toast({ title: "Role updated", description: "Staff permissions have been modified." });
  };

  const updateUserSite = (userId: string, newSiteId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, siteId: newSiteId } : u));
    toast({ title: "Site reassigned", description: "Staff member moved to new location." });
  };

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
            <h1 className="font-headline text-3xl font-bold tracking-tight">Admin Control Center</h1>
          </div>
          <p className="text-muted-foreground">Manage sites, staff roles, and system-wide settings.</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: "Active Users", value: users.length.toString(), icon: Users, color: "text-blue-500" },
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
                    <CardDescription>Assign roles and sites to your team members</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add Staff Member
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Staff Member</TableHead>
                      <TableHead>Assigned Site</TableHead>
                      <TableHead>Professional Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div>{user.name}</div>
                          <div className="text-[10px] text-muted-foreground">{user.email}</div>
                        </TableCell>
                        <TableCell>
                          <Select 
                            defaultValue={user.siteId} 
                            onValueChange={(val) => updateUserSite(user.id, val)}
                          >
                            <SelectTrigger className="h-8 w-[160px] bg-background">
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
                            onValueChange={(val) => updateUserRole(user.id, val)}
                          >
                            <SelectTrigger className="h-8 w-[140px] bg-background">
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
                          <Badge variant={user.status === "Active" || user.status === "On Shift" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {site.location}
                          </div>
                        </TableCell>
                        <TableCell>{site.manager}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {users.filter(u => u.siteId === site.id).length} Staff
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
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

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-lg">System Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100 text-orange-800">
                <AlertTriangle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">API Rate Limit</p>
                  <p className="text-xs">Genkit flows approaching tier limits.</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100 text-blue-800">
                <Settings className="h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-bold">New Version Available</p>
                  <p className="text-xs">v2.4.0 is ready for deployment.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-xl bg-foreground text-background md:col-span-2">
            <CardHeader>
              <CardTitle className="font-headline text-lg text-white">Advanced Configuration</CardTitle>
              <CardDescription className="text-muted-foreground">Dangerous operations and maintenance tools.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                  <FileText className="mr-2 h-4 w-4" /> Export All Data (CSV/JSON)
                </Button>
                <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                  <Activity className="mr-2 h-4 w-4" /> View Full Audit Logs
                </Button>
              </div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                  <UserCog className="mr-2 h-4 w-4" /> Global Permissions Reset
                </Button>
                <Button variant="destructive" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Enter Maintenance Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
