'use server';
/**
 * @fileOverview A Genkit flow for summarizing team 'Shower Thoughts'.
 *
 * - summarizeTeamShowerThoughts - A function that handles the summarization of team shower thoughts.
 * - SummarizeTeamShowerThoughtsInput - The input type for the summarizeTeamShowerThoughts function.
 * - SummarizeTeamShowerThoughtsOutput - The return type for the summarizeTeamShowerThoughts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTeamShowerThoughtsInputSchema = z
  .object({
    showerThoughts: z
      .array(z.string())
      .describe('An array of "Shower Thoughts" submitted by the team.'),
  })
  .describe('Input for the summarizeTeamShowerThoughts flow.');
export type SummarizeTeamShowerThoughtsInput = z.infer<
  typeof SummarizeTeamShowerThoughtsInputSchema
>;

const SummarizeTeamShowerThoughtsOutputSchema = z
  .object({
    commonThemes: z
      .array(z.string())
      .describe('A list of common themes identified in the shower thoughts.'),
    urgentConcerns: z
      .array(z.string())
      .describe(
        'A list of urgent concerns or issues requiring immediate attention.'
      ),
    positiveSentiments: z
      .array(z.string())
      .describe('A list of positive sentiments or feedback.'),
  })
  .describe('Output from the summarizeTeamShowerThoughts flow.');
export type SummarizeTeamShowerThoughtsOutput = z.infer<
  typeof SummarizeTeamShowerThoughtsOutputSchema
>;

export async function summarizeTeamShowerThoughts(
  input: SummarizeTeamShowerThoughtsInput
): Promise<SummarizeTeamShowerThoughtsOutput> {
  return summarizeTeamShowerThoughtsFlow(input);
}

const summarizeTeamShowerThoughtsPrompt = ai.definePrompt({
  name: 'summarizeTeamShowerThoughtsPrompt',
  input: {schema: SummarizeTeamShowerThoughtsInputSchema},
  output: {schema: SummarizeTeamShowerThoughtsOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing team "Shower Thoughts".
Your goal is to extract common themes, urgent concerns, and positive sentiments from a collection of anonymous feedback.

Here are the "Shower Thoughts" to analyze:
{{#each showerThoughts}}
- {{{this}}}
{{/each}}

Based on the provided "Shower Thoughts", please identify:
1. Common Themes: List the recurring subjects or topics.
2. Urgent Concerns: List any issues that seem critical or require immediate attention.
3. Positive Sentiments: List any expressions of gratitude, satisfaction, or good ideas.

Respond in JSON format according to the output schema.`,
});

const summarizeTeamShowerThoughtsFlow = ai.defineFlow(
  {
    name: 'summarizeTeamShowerThoughtsFlow',
    inputSchema: SummarizeTeamShowerThoughtsInputSchema,
    outputSchema: SummarizeTeamShowerThoughtsOutputSchema,
  },
  async input => {
    const {output} = await summarizeTeamShowerThoughtsPrompt(input);
    return output!;
  }
);
