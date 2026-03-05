"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface SurveyFormProps {
  surveyData: any;
  taker: { name: string; email: string };
  subject: { name: string; email: string };
  onSubmit: (answers: any) => void;
  isSelfAssessment?: boolean;
}

export function SurveyForm({ surveyData, taker, subject, onSubmit, isSelfAssessment }: SurveyFormProps) {
  const { toast } = useToast();
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [overall, setOverall] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate progress
  const totalQuestions = surveyData.categories.reduce((acc: number, cat: any) => acc + cat.questions.length, 0) + 1; // +1 for overall
  const answeredQuestions = Object.keys(ratings).length + (overall ? 1 : 0);
  const progress = (answeredQuestions / totalQuestions) * 100;

  const handleRatingChange = (questionId: string, value: string) => {
    setRatings((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleFeedbackChange = (questionId: string, value: string) => {
    setFeedback((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answeredQuestions < totalQuestions) {
      toast({
        variant: "destructive",
        title: "Incomplete Survey",
        description: "Please answer all required rating questions before submitting.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        taker,
        subject,
        isSelfAssessment,
        ratings,
        feedback,
        overallAssessment: overall,
        submittedAt: new Date().toISOString(),
      };
      
      onSubmit(payload);
      
      toast({
        title: "Survey Submitted!",
        description: isSelfAssessment ? "Your self-assessment has been saved." : `Feedback for ${subject.name} has been sent.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: "There was a problem saving your responses. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-24">
      <div className="sticky top-[65px] z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 -mx-4 px-4 border-b">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold uppercase tracking-tighter text-muted-foreground">Completion Progress</span>
          <span className="text-xs font-bold text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6">
        {surveyData.categories.map((category: any) => (
          <Card key={category.id} className="border-none shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="font-headline text-xl">{category.title}</CardTitle>
            </CardHeader>
            <CardContent className="divide-y pt-6">
              {category.questions.map((q: any) => (
                <div key={q.id} className="py-8 first:pt-0 last:pb-0 space-y-6">
                  <Label className="text-base font-medium leading-relaxed block">
                    {q.text}
                  </Label>
                  <RadioGroup 
                    onValueChange={(val) => handleRatingChange(q.id, val)}
                    value={ratings[q.id]}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2"
                  >
                    {surveyData.scale.map((scaleItem: any) => (
                      <div key={scaleItem.value} className="relative">
                        <RadioGroupItem
                          value={scaleItem.value}
                          id={`${q.id}-${scaleItem.value}`}
                          className="peer sr-only"
                        />
                        <Label
                          htmlFor={`${q.id}-${scaleItem.value}`}
                          className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:border-primary/20 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center transition-all h-full min-h-[100px]"
                        >
                          <span className="text-2xl font-headline font-bold mb-1">{scaleItem.value}</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold leading-tight">
                            {scaleItem.label.split(" - ")[1]}
                          </span>
                          {ratings[q.id] === scaleItem.value && (
                            <CheckCircle2 className="absolute top-2 right-2 h-4 w-4 text-primary animate-in zoom-in duration-200" />
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}

        <Card className="border-none shadow-md">
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="font-headline text-xl">Specific Examples</CardTitle>
            <CardDescription>Detail helps us understand where {isSelfAssessment ? "you" : "they"} shine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            {surveyData.openEnded.map((q: any) => (
              <div key={q.id} className="space-y-3">
                <Label htmlFor={q.id} className="text-base font-bold">
                  {q.text}
                </Label>
                <Textarea
                  id={q.id}
                  placeholder="Type your response here..."
                  className="min-h-[120px] resize-none bg-muted/20 border-muted focus:bg-background transition-all"
                  value={feedback[q.id] || ""}
                  onChange={(e) => handleFeedbackChange(q.id, e.target.value)}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="font-headline text-xl text-primary">Overall Assessment</CardTitle>
            <CardDescription>Choose the statement that best fits overall performance.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <RadioGroup 
              onValueChange={setOverall}
              value={overall}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              {surveyData.scale.map((scaleItem: any) => (
                <div key={`overall-${scaleItem.value}`}>
                  <RadioGroupItem
                    value={scaleItem.value}
                    id={`overall-${scaleItem.value}`}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={`overall-${scaleItem.value}`}
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-5 hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center h-full min-h-[80px] transition-all"
                  >
                    <span className="font-bold text-sm">{scaleItem.label}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-10">
        <Button 
          size="lg" 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full md:w-[300px] h-14 text-lg font-bold shadow-lg shadow-primary/20"
        >
          {isSubmitting ? "Submitting..." : "Finish Assessment"}
        </Button>
      </div>
    </form>
  );
}
