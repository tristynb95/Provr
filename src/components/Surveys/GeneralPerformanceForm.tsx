"use client";

import { useState } from "react";
import { performanceSurveyData } from "@/lib/survey-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Utilizing your existing toast hook

export default function GeneralPerformanceForm({ targetUserId }: { targetUserId?: string }) {
  const { toast } = useToast();
  
  // State for 1-4 scale questions
  const [ratings, setRatings] = useState<Record<string, string>>({});
  // State for open-ended questions
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  // State for overall assessment
  const [overall, setOverall] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (questionId: string, value: string) => {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleFeedbackChange = (questionId: string, value: string) => {
    setFeedback((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        targetUserId,
        ratings,
        feedback,
        overallAssessment: overall,
        submittedAt: new Date().toISOString(),
      };

      // TODO: Connect to your existing Firebase setup here
      // await addDoc(collection(db, 'surveys'), payload);

      console.log("Survey Payload:", payload);

      toast({
        title: "Survey Submitted",
        description: "Thank you for providing feedback.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting your survey.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">360° Feedback Survey</h1>
        <p className="text-muted-foreground">
          Confidential Peer, Line Manager & Team Feedback. Rate each statement from 1 to 4.
        </p>
      </div>

      {performanceSurveyData.categories.map((category) => (
        <Card key={category.id} className="shadow-sm">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-xl">{category.title}</CardTitle>
          </CardHeader>
          <CardContent className="divide-y pt-6">
            {category.questions.map((q) => (
              <div key={q.id} className="py-6 first:pt-0 last:pb-0 space-y-4">
                <Label className="text-base font-medium leading-relaxed">
                  {q.text}
                </Label>
                <RadioGroup 
                  onValueChange={(val) => handleRatingChange(q.id, val)}
                  value={ratings[q.id]}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2"
                >
                  {performanceSurveyData.scale.map((scaleItem) => (
                    <div key={scaleItem.value}>
                      <RadioGroupItem
                        value={scaleItem.value}
                        id={`${q.id}-${scaleItem.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`${q.id}-${scaleItem.value}`}
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center"
                      >
                        <span className="text-lg font-bold">{scaleItem.value}</span>
                        <span className="text-xs text-muted-foreground mt-1 text-center font-normal">
                          {scaleItem.label.split(" - ")[1]}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <Card className="shadow-sm">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-xl">Open-Ended Feedback</CardTitle>
          <CardDescription>Specific examples are especially valuable.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {performanceSurveyData.openEnded.map((q) => (
            <div key={q.id} className="space-y-3">
              <Label htmlFor={q.id} className="text-base font-medium">
                {q.text}
              </Label>
              <Textarea
                id={q.id}
                placeholder="Share your thoughts..."
                className="min-h-[100px] resize-y"
                value={feedback[q.id] || ""}
                onChange={(e) => handleFeedbackChange(q.id, e.target.value)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-primary/50 shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/20">
          <CardTitle className="text-xl">Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <RadioGroup 
            onValueChange={setOverall}
            value={overall}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          >
            {performanceSurveyData.scale.map((scaleItem) => (
              <div key={`overall-${scaleItem.value}`}>
                <RadioGroupItem
                  value={scaleItem.value}
                  id={`overall-${scaleItem.value}`}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={`overall-${scaleItem.value}`}
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center"
                >
                  <span className="font-semibold">{scaleItem.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button size="lg" type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12">
          {isSubmitting ? "Submitting..." : "Submit Feedback"}
        </Button>
      </div>
    </form>
  );
}