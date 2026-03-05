import { Navbar } from "@/components/layout/Navbar";
import { AISummaryCard } from "@/components/dashboard/AISummaryCard";
import { FeedbackComparison } from "@/components/dashboard/FeedbackComparison";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, TrendingUp, MessageSquare, Award } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Your Performance Dashboard</h1>
            <p className="text-muted-foreground">Tracking your growth at Provr Bakery over time.</p>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
             <Card className="flex items-center gap-3 p-3 border-none shadow-sm min-w-[150px]">
                <div className="p-2 bg-green-100 rounded-lg text-green-700">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Self-Efficacy</p>
                  <p className="text-lg font-headline font-bold">88%</p>
                </div>
             </Card>
             <Card className="flex items-center gap-3 p-3 border-none shadow-sm min-w-[150px]">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Avg. Peer Score</p>
                  <p className="text-lg font-headline font-bold">4.2/5</p>
                </div>
             </Card>
          </div>
        </header>

        <section className="mb-10">
          <AISummaryCard />
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold">Deep Dive Analysis</h2>
            <Tabs defaultValue="competencies">
              <TabsList className="grid w-[300px] grid-cols-2">
                <TabsTrigger value="competencies">Competencies</TabsTrigger>
                <TabsTrigger value="spark">SPARK Behaviors</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <FeedbackComparison />
        </section>

        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2 border-none shadow-md">
            <CardHeader>
              <CardTitle className="font-headline">Recent Feedback Log</CardTitle>
              <CardDescription>A chronological list of comments received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-lg bg-muted/30 border border-transparent hover:border-primary/5 transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm font-bold">Store Manager</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">Oct {12 + i}, 2023</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Great shift yesterday! Your handling of the busy breakfast rush was impeccable. Keep up the high energy.</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-foreground text-background">
            <CardHeader>
              <CardTitle className="font-headline text-white">Career Path</CardTitle>
              <CardDescription className="text-muted-foreground">Next steps for Alex Baker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-xs font-bold text-primary uppercase mb-1">Target Role</p>
                <p className="text-lg font-bold text-white mb-2">Shift Lead</p>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[10px] mt-2 text-muted-foreground">65% of requirements met</p>
              </div>
              <Button className="w-full bg-white text-black hover:bg-white/90">
                View Progression Plan
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
