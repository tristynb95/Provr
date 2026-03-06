
'use server';
/**
 * @fileOverview A Genkit flow for summarising individual feedback received by an employee.
 *
 * - summariseIndividualFeedback - A function that handles the feedback summarisation process.
 * - SummarizeIndividualFeedbackInput - The input type for the summariseIndividualFeedback function.
 * - SummarizeIndividualFeedbackOutput - The return type for the summariseIndividualFeedback function.
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

export async function summariseIndividualFeedback(
  input: SummarizeIndividualFeedbackInput
): Promise<SummarizeIndividualFeedbackOutput> {
  return summariseIndividualFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summariseIndividualFeedbackPrompt',
  input: { schema: SummarizeIndividualFeedbackInputSchema },
  output: { schema: SummarizeIndividualFeedbackOutputSchema },
  prompt: `You are an AI assistant specialised in analysing employee feedback. Please provide all output in British English.

Your task is to summarise the provided feedback comments for an employee. Identify key themes, highlight strengths, and pinpoint areas for development.

Here are the feedback comments:
{{#each feedbackComments}}
- {{{this}}}
{{/each}}

Provide a concise overall summary, a list of key strengths, and a list of key areas for development. Ensure the output is structured as a JSON object with 'summary', 'strengths', and 'areasForDevelopment' fields, matching the provided schema description.`,
});

const summariseIndividualFeedbackFlow = ai.defineFlow(
  {
    name: 'summariseIndividualFeedbackFlow',
    inputSchema: SummarizeIndividualFeedbackInputSchema,
    outputSchema: SummarizeIndividualFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
