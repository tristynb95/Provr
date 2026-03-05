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
  FileText
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

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
          <p className="text-muted-foreground">System-wide settings and ultimate control over Provr.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          {[
            { label: "Active Users", value: "24", icon: Users, color: "text-blue-500" },
            { label: "Total Feedback", value: "1,204", icon: MessageSquare, color: "text-green-500" },
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

        <div className="grid gap-8 lg:grid-cols-3">
          {/* User Management */}
          <Card className="lg:col-span-2 border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="font-headline">Staff Management</CardTitle>
                  <CardDescription>View and manage all Provr. employees</CardDescription>
                </div>
                <Button size="sm">Add Staff</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Tristen B.", role: "Super Admin", status: "Active", email: "tristen@provr.com" },
                    { name: "Sarah Miller", role: "Head Baker", status: "Active", email: "sarah@provr.com" },
                    { name: "Alex Baker", role: "Barista", status: "On Shift", email: "alex@provr.com" },
                    { name: "Jack Thompson", role: "Store Manager", status: "Away", email: "jack@provr.com" },
                  ].map((user, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <div>{user.name}</div>
                        <div className="text-[10px] text-muted-foreground">{user.email}</div>
                      </TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "Active" || user.status === "On Shift" ? "default" : "secondary"}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* System Controls */}
          <div className="space-y-6">
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

            <Card className="border-none shadow-xl bg-foreground text-background">
              <CardHeader>
                <CardTitle className="font-headline text-lg text-white">Advanced Config</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                  <FileText className="mr-2 h-4 w-4" /> Export All Data
                </Button>
                <Button variant="outline" className="w-full justify-start border-white/10 text-white hover:bg-white/10">
                  <Activity className="mr-2 h-4 w-4" /> View Audit Logs
                </Button>
                <Button variant="destructive" className="w-full justify-start mt-4">
                  <Settings className="mr-2 h-4 w-4" /> Maintenance Mode
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
