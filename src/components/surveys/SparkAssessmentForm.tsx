'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { sparkSurveyData, sparkScale, sparkOverallSummary } from "@/lib/spark-survey-data";
import { SurveyHeader } from "@/components/surveys/SurveyHeader";

// In a real app, these would be props
interface SparkFormProps {
  taker: {
    name: string;
    email: string;
  };
  subject: {
    name: string;
    email: string;
  };
  isSelfAssessment?: boolean;
}

// Create a dynamic schema based on the survey data
const formSchema = z.object({
  ...sparkSurveyData.reduce((acc, category) => {
    category.levels.forEach(level => {
      level.questions.forEach(question => {
        acc[question.id] = z.string().nonempty({ message: "Please select a rating." });
      });
    });
    acc[`${category.id}_comment`] = z.string().optional();
    return acc;
  }, {} as Record<string, z.ZodString>),
  ...sparkOverallSummary.reduce((acc, summary) => {
    acc[summary.id] = z.string().optional();
    return acc;
  }, {} as Record<string, z.ZodString>)
});


export function SparkAssessmentForm({ taker, subject, isSelfAssessment = false }: SparkFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd send this data to your backend
    console.log(values);
    alert("Survey submitted! Check the console for the form data.");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <SurveyHeader
          title="SPARK Competency Assessment"
          description={
            isSelfAssessment
              ? "This is a self-assessment of your SPARK competencies. Please be honest and objective in your responses."
              : `You are completing this assessment for ${subject.name}. Please be honest and objective in your responses.`
          }
          subject={subject.name}
        />

        {sparkSurveyData.map(category => (
          <div key={category.id} className="space-y-8 p-6 bg-card rounded-lg shadow-sm">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-primary">{category.title}</h2>
              <p className="text-muted-foreground">{category.subtitle}</p>
            </div>

            {category.levels.map(level => (
              <div key={level.level} className="p-6 border-t border-border">
                <h3 className="text-lg font-semibold">{level.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{level.subtitle}</p>
                <div className="space-y-6">
                  {level.questions.map(question => (
                    <FormField
                      key={question.id}
                      control={form.control}
                      name={question.id}
                      render={({ field }) => (
                        <FormItem className="space-y-3 p-4 border rounded-md bg-background/50">
                          <FormLabel className="font-normal">{question.text}</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-wrap gap-4 pt-2"
                            >
                              {sparkScale.map(option => (
                                <FormItem key={option.value} className="flex items-center space-x-2 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value={option.value} />
                                  </FormControl>
                                  <FormLabel className="font-normal text-sm">{option.label}</FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}

            <FormField
              control={form.control}
              name={`${category.id}_comment`}
              render={({ field }) => (
                <FormItem className="px-6 pt-6 border-t border-border">
                  <FormLabel className="text-base">{category.commentPrompt}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide specific examples or comments..."
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

        {/* Overall Summary Section */}
        <div className="space-y-8 p-6 bg-card rounded-lg shadow-sm">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-primary">Overall Summary</h2>
            <p className="text-muted-foreground">Please provide your final thoughts and recommendations.</p>
          </div>
          <div className="space-y-6 px-6">
            {sparkOverallSummary.map(summary => (
              <FormField
                key={summary.id}
                control={form.control}
                name={summary.id}
                render={({ field }) => (
                  <FormItem className="pt-6 border-t border-border">
                    <FormLabel className="text-base">{summary.text}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Your thoughts..."
                        className="resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>


        <div className="flex justify-end pt-8">
          <Button type="submit" size="lg">Submit Assessment</Button>
        </div>
      </form>
    </Form>
  );
}
