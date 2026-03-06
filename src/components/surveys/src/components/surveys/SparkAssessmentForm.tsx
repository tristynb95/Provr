"use client";

import { useState } from "react";
import { sparkSurveyData, sparkScale, sparkRoles, sparkOverallSummary } from "@/lib/spark-survey-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SparkAssessmentFormProps {
  isSelfAssessment?: boolean;
  targetUserId?: string;
}

export default function SparkAssessmentForm({ isSelfAssessment = false, targetUserId }: SparkAssessmentFormProps) {
  const { toast } = useToast();
  
  // Tristen is Level 4 (Bakery Manager). For peers/team, default to Level 1.
  const [targetLevel, setTargetLevel] = useState<number>(isSelfAssessment ? 4 : 1);
  const [ratings, setRatings] = useState<Record<string, string>>({});
  const [pillarComments, setPillarComments] = useState<Record<string, string>>({});
  const [overallSummary, setOverallSummary] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        targetUserId: isSelfAssessment ? "self" : targetUserId,
        isSelfAssessment,
        assessedLevel: targetLevel,
        ratings,
        pillarComments,
        overallSummary,
        submittedAt: new Date().toISOString(),
      };

      console.log("SPARK Survey Payload:", payload);

      toast({
        title: "Assessment Submitted",
        description: "Thank you for completing the SPARK evaluation.",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem submitting the assessment.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isSelfAssessment ? "SPARK Self-Assessment" : "SPARK 360° Feedback"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Aligned to SPARK Leadership Competencies. Competencies stack: you will see questions up to and including the selected role level.
          </p>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <Label htmlFor="role-level" className="text-base font-semibold mb-3 block">
              {isSelfAssessment ? "My Current Role Level" : "Role Level Being Assessed"}
            </Label>
            <Select 
              value={targetLevel.toString()} 
              onValueChange={(val) => setTargetLevel(parseInt(val))}
            >
              <SelectTrigger id="role-level" className="w-full md:w-[400px] bg-background">
                <SelectValue placeholder="Select a role level" />
              </SelectTrigger>
              <SelectContent>
                {sparkRoles.map((role) => (
                  <SelectItem key={role.value} value={role.value.toString()}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {sparkSurveyData.map((pillar) => (
        <Card key={pillar.id} className="shadow-sm overflow-hidden">
          <CardHeader className="bg-muted/40 border-b">
            <CardTitle className="text-2xl">{pillar.title}</CardTitle>
            <CardDescription className="text-base text-foreground/80 font-medium">
              {pillar.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="divide-y p-0">
            {pillar.levels
              .filter((levelData) => levelData.level <= targetLevel)
              .map((levelData) => (
                <div key={`${pillar.id}-${levelData.level}`} className="p-6 bg-card">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-primary">{levelData.title}</h3>
                    <p className="text-sm text-muted-foreground">{levelData.subtitle}</p>
                  </div>
                  <div className="space-y-8">
                    {levelData.questions.map((q) => (
                      <div key={q.id} className="space-y-3">
                        <Label className="text-base font-medium leading-relaxed">
                          {q.text}
                        </Label>
                        <RadioGroup 
                          onValueChange={(val) => setRatings(prev => ({ ...prev, [q.id]: val }))}
                          value={ratings[q.id]}
                          className="flex flex-wrap gap-2 pt-2"
                        >
                          {sparkScale.map((scaleItem) => (
                            <div key={scaleItem.value} className="flex-1 min-w-[60px]">
                              <RadioGroupItem
                                value={scaleItem.value}
                                id={`${q.id}-${scaleItem.value}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`${q.id}-${scaleItem.value}`}
                                className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover py-3 px-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer text-center h-full transition-all"
                              >
                                <span className="text-lg font-bold">{scaleItem.value}</span>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    ))}
                  </div>
                </div>
            ))}
            <div className="p-6 bg-muted/10">
              <Label htmlFor={`comment-${pillar.id}`} className="text-base font-medium mb-3 block">
                {isSelfAssessment ? pillar.commentPrompt.replace("this person's", "my") : pillar.commentPrompt}
              </Label>
              <Textarea
                id={`comment-${pillar.id}`}
                placeholder="Add examples or context here..."
                className="min-h-[100px] bg-background"
                value={pillarComments[pillar.id] || ""}
                onChange={(e) => setPillarComments(prev => ({ ...prev, [pillar.id]: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="shadow-sm">
        <CardHeader className="bg-primary/5 border-b border-primary/10">
          <CardTitle className="text-xl">Overall Summary</CardTitle>
          <CardDescription>Provide constructive feedback to guide development over the next 3 months.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {sparkOverallSummary.map((q) => {
            const labelText = isSelfAssessment ? q.text.replace(/this person/g, "I").replace(/they/g, "I") : q.text;
            return (
              <div key={q.id} className="space-y-3">
                <Label htmlFor={q.id} className="text-base font-medium leading-relaxed">
                  {labelText}
                </Label>
                <Textarea
                  id={q.id}
                  placeholder="Share your thoughts..."
                  className="min-h-[100px] resize-y"
                  value={overallSummary[q.id] || ""}
                  onChange={(e) => setOverallSummary(prev => ({ ...prev, [q.id]: e.target.value }))}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end pt-4">
        <Button size="lg" type="submit" disabled={isSubmitting} className="w-full md:w-auto px-12">
          {isSubmitting ? "Submitting..." : "Submit SPARK Assessment"}
        </Button>
      </div>
    </form>
  );
}