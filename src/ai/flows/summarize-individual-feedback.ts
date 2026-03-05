'use server';
/**
 * @fileOverview A Genkit flow for summarizing individual feedback received by an employee.
 *
 * - summarizeIndividualFeedback - A function that handles the feedback summarization process.
 * - SummarizeIndividualFeedbackInput - The input type for the summarizeIndividualFeedback function.
 * - SummarizeIndividualFeedbackOutput - The return type for the summarizeIndividualFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeIndividualFeedbackInputSchema = z.object({
  feedbackComments: z
    .array(z.string())
    .describe('An array of individual feedback comments received by an employee.'),
});
export type SummarizeIndividualFeedbackInput = z.infer<
  typeof SummarizeIndividualFeedbackInputSchema
>;

const SummarizeIndividualFeedbackOutputSchema = z.object({
  summary: z.string().describe('A concise overall summary of the feedback.'),
  strengths: z
    .array(z.string())
    .describe('A list of key strengths identified from the feedback.'),
  areasForDevelopment: z
    .array(z.string())
    .describe('A list of key areas for development identified from the feedback.'),
});
export type SummarizeIndividualFeedbackOutput = z.infer<
  typeof SummarizeIndividualFeedbackOutputSchema
>;

export async function summarizeIndividualFeedback(
  input: SummarizeIndividualFeedbackInput
): Promise<SummarizeIndividualFeedbackOutput> {
  return summarizeIndividualFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIndividualFeedbackPrompt',
  input: { schema: SummarizeIndividualFeedbackInputSchema },
  output: { schema: SummarizeIndividualFeedbackOutputSchema },
  prompt: `You are an AI assistant specialized in analyzing employee feedback.

Your task is to summarize the provided feedback comments for an employee. Identify key themes, highlight strengths, and pinpoint areas for development.

Here are the feedback comments:
{{#each feedbackComments}}
- {{{this}}}
{{/each}}

Provide a concise overall summary, a list of key strengths, and a list of key areas for development. Ensure the output is structured as a JSON object with 'summary', 'strengths', and 'areasForDevelopment' fields, matching the provided schema description.`,
});

const summarizeIndividualFeedbackFlow = ai.defineFlow(
  {
    name: 'summarizeIndividualFeedbackFlow',
    inputSchema: SummarizeIndividualFeedbackInputSchema,
    outputSchema: SummarizeIndividualFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
