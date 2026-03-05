"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Smile, Frown, Meh, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { addPulseResponse } from "@/lib/firestore";

export default function PulseCheckPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [nps, setNps] = useState([5]);
  const [workload, setWorkload] = useState("3");
  const [leadership, setLeadership] = useState(4);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const storedUser = localStorage.getItem('provr_user');
      const user = storedUser ? JSON.parse(storedUser) : null;

      await addPulseResponse({
        authorUsername: user?.username ?? "unknown",
        siteId: user?.siteId ?? "unassigned",
        nps: nps[0],
        workload: parseInt(workload, 10),
        leadership,
      });

      toast({
        title: "Pulse received!",
        description: "Thank you for sharing how you feel today.",
      });
      router.push("/");
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Failed to submit",
        description: "Could not save your pulse. Please try again.",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-headline text-3xl font-bold">Quick Pulse Check</h1>
          <p className="text-muted-foreground mt-2">Help us make Provr. a better place to work.</p>
        </div>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Question {step} of 3</span>
              <div className="h-1 w-24 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(step / 3) * 100}%` }}></div>
              </div>
            </div>
            {step === 1 && <CardTitle className="font-headline text-xl">How likely are you to recommend Provr. as a place to work?</CardTitle>}
            {step === 2 && <CardTitle className="font-headline text-xl">How do you feel about your workload this week?</CardTitle>}
            {step === 3 && <CardTitle className="font-headline text-xl">How supported do you feel by your leadership?</CardTitle>}
          </CardHeader>
          <CardContent className="py-10">
            {step === 1 && (
              <div className="space-y-8">
                <div className="flex justify-between px-2 text-xs font-medium text-muted-foreground">
                  <span>Not at all likely</span>
                  <span>Neutral</span>
                  <span>Extremely likely</span>
                </div>
                <Slider
                  value={nps}
                  onValueChange={setNps}
                  max={10}
                  step={1}
                  className="py-4"
                />
                <div className="text-center">
                  <span className="text-6xl font-headline font-bold text-primary">{nps[0]}</span>
                  <p className="text-sm font-medium mt-2">Score out of 10</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <RadioGroup value={workload} onValueChange={setWorkload} className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <div key={val}>
                    <RadioGroupItem value={val.toString()} id={`workload-${val}`} className="peer sr-only" />
                    <Label
                      htmlFor={`workload-${val}`}
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                    >
                      {val === 1 && <Frown className="mb-3 h-6 w-6 text-destructive" />}
                      {val === 2 && <Frown className="mb-3 h-6 w-6 opacity-60" />}
                      {val === 3 && <Meh className="mb-3 h-6 w-6 text-yellow-500" />}
                      {val === 4 && <Smile className="mb-3 h-6 w-6 opacity-60" />}
                      {val === 5 && <Smile className="mb-3 h-6 w-6 text-green-500" />}
                      <span className="text-xs font-bold">{val}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            {step === 3 && (
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((val) => (
                  <Button
                    key={val}
                    variant="outline"
                    className={cn(
                      "h-16 w-16 rounded-full border-2 hover:border-primary hover:text-primary transition-all p-0",
                      val <= leadership ? "border-primary" : ""
                    )}
                    onClick={() => setLeadership(val)}
                  >
                    <Star className={cn("h-6 w-6", val <= leadership ? "fill-primary text-primary" : "text-muted-foreground")} />
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => step > 1 && setStep(step - 1)} disabled={step === 1}>
              Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)}>Next Question</Button>
            ) : (
              <Button onClick={handleSubmit} className="bg-primary text-primary-foreground" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Pulse"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
