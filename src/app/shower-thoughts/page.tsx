"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { summarizeTeamShowerThoughts, type SummarizeTeamShowerThoughtsOutput } from "@/ai/flows/summarize-team-shower-thoughts";
import { Lightbulb, Sparkles, MessageSquare, AlertCircle, Heart, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockThoughts = [
  "The coffee machine on the left is acting up again, might need a service.",
  "Everyone is doing so well with the new autumn menu launch! Big love to the team.",
  "I think we should have more training on the gluten-free bread prep to avoid cross contamination.",
  "Can we look into a better way to organize the back storage? It's becoming a trip hazard.",
  "I love working here! Such a great vibe in the mornings."
];

export default function ShowerThoughtsPage() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummarizeTeamShowerThoughtsOutput | null>(null);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const result = await summarizeTeamShowerThoughts({ showerThoughts: mockThoughts });
      setSummary(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:px-6">
        <header className="mb-10">
          <h1 className="font-headline text-3xl font-bold tracking-tight mb-2">Team Shower Thoughts</h1>
          <p className="text-muted-foreground">Review ideas and concerns from your bakery team.</p>
        </header>

        <section className="mb-12">
          <Card className="border-none shadow-xl bg-primary text-primary-foreground relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <Lightbulb className="h-40 w-40" />
             </div>
             <CardHeader>
               <CardTitle className="font-headline text-2xl">Manager AI Summary</CardTitle>
               <CardDescription className="text-primary-foreground/70">Summarize anonymous feedback into actionable themes.</CardDescription>
             </CardHeader>
             <CardContent>
                {!summary && !loading && (
                   <Button onClick={generateSummary} variant="secondary" className="group">
                     <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                     Analyze {mockThoughts.length} Recent Thoughts
                   </Button>
                )}

                {loading && (
                  <div className="flex items-center gap-3 py-4">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <p className="text-sm font-medium">Extracting themes and sentiments...</p>
                  </div>
                )}

                {summary && (
                  <div className="grid gap-6 md:grid-cols-3 mt-4 animate-in fade-in duration-500">
                    <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-3 text-white font-bold text-xs uppercase">
                        <MessageSquare className="h-4 w-4" />
                        Common Themes
                      </div>
                      <ul className="space-y-1">
                        {summary.commonThemes.map((t, i) => (
                          <li key={i} className="text-sm text-primary-foreground/90">• {t}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-destructive/20 p-4 rounded-xl backdrop-blur-sm border border-destructive/20">
                      <div className="flex items-center gap-2 mb-3 text-destructive font-bold text-xs uppercase">
                        <AlertCircle className="h-4 w-4" />
                        Urgent Concerns
                      </div>
                      <ul className="space-y-1">
                        {summary.urgentConcerns.map((t, i) => (
                          <li key={i} className="text-sm text-foreground/90">• {t}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-900/10 p-4 rounded-xl backdrop-blur-sm border border-green-500/10">
                      <div className="flex items-center gap-2 mb-3 text-green-700 dark:text-green-300 font-bold text-xs uppercase">
                        <Heart className="h-4 w-4" />
                        Positive Sentiment
                      </div>
                      <ul className="space-y-1">
                        {summary.positiveSentiments.map((t, i) => (
                          <li key={i} className="text-sm text-foreground/90">• {t}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
             </CardContent>
          </Card>
        </section>

        <section className="grid gap-6">
           <h2 className="font-headline text-2xl font-bold">Recent Feed</h2>
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
             {mockThoughts.map((thought, i) => (
               <Card key={i} className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
                 <CardContent className="pt-6">
                   <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary" className="text-[10px] font-bold">Anonymous</Badge>
                      <span className="text-[10px] font-bold text-muted-foreground">Today</span>
                   </div>
                   <p className="text-sm text-foreground/80 leading-relaxed">"{thought}"</p>
                 </CardContent>
               </Card>
             ))}
           </div>
        </section>
      </main>
    </div>
  );
}
