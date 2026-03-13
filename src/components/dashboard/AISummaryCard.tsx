
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { summariseIndividualFeedback, type SummarizeIndividualFeedbackOutput } from "@/ai/flows/summarize-individual-feedback";
import { Sparkles, BrainCircuit, CheckCircle, Target, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockFeedback = [
  "Alex is incredible at customer service, always has a smile and remembers regulars.",
  "Needs to work on closing procedures, sometimes the coffee station is left a bit messy.",
  "Very reliable teammate, always covers shifts when people are sick.",
  "I'd love to see Alex take more initiative in training new starters.",
  "Product knowledge on the sourdough range is top tier."
];

export function AISummaryCard() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<SummarizeIndividualFeedbackOutput | null>(null);

  const generateSummary = async () => {
    setLoading(true);
    try {
      const result = await summariseIndividualFeedback({ feedbackComments: mockFeedback });
      setSummary(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 via-background to-background relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
        <BrainCircuit className="h-24 w-24 text-primary" />
      </div>
      
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="font-headline">AI Feedback Digest</CardTitle>
        </div>
        <CardDescription>We've analysed your last 5 feedback comments to find themes.</CardDescription>
      </CardHeader>
      
      <CardContent>
        {!summary && !loading && (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Click below to generate a smart summary of your peer feedback.</p>
            <Button onClick={generateSummary} className="bg-primary text-primary-foreground group">
              <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
              Generate Summary
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium animate-pulse">AI is reading through your feedback...</p>
          </div>
        )}

        {summary && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="bg-white/80 p-4 rounded-lg border">
              <p className="text-sm leading-relaxed italic text-muted-foreground">"{summary.summary}"</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
                  <CheckCircle className="h-4 w-4" />
                  Key Strengths
                </div>
                <ul className="space-y-1">
                  {summary.strengths.map((s, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-foreground font-bold text-sm uppercase tracking-wider">
                  <Target className="h-4 w-4" />
                  Growth Areas
                </div>
                <ul className="space-y-1">
                  {summary.areasForDevelopment.map((a, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-foreground shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center pt-2">
              <Button variant="ghost" size="sm" onClick={() => setSummary(null)}>Reset Summary</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
