
'use server';
/**
 * @fileOverview A Genkit flow for summarising team 'Shower Thoughts'.
 *
 * - summariseTeamShowerThoughts - A function that handles the summarisation of team shower thoughts.
 * - SummarizeTeamShowerThoughtsInput - The input type for the summariseTeamShowerThoughts function.
 * - SummarizeTeamShowerThoughtsOutput - The return type for the summariseTeamShowerThoughts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTeamShowerThoughtsInputSchema = z
  .object({
    showerThoughts: z
      .array(z.string())
      .describe('An array of "Shower Thoughts" submitted by the team.'),
  })
  .describe('Input for the summariseTeamShowerThoughts flow.');
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
  .describe('Output from the summariseTeamShowerThoughts flow.');
export type SummarizeTeamShowerThoughtsOutput = z.infer<
  typeof SummarizeTeamShowerThoughtsOutputSchema
>;

export async function summariseTeamShowerThoughts(
  input: SummarizeTeamShowerThoughtsInput
): Promise<SummarizeTeamShowerThoughtsOutput> {
  return summariseTeamShowerThoughtsFlow(input);
}

const summariseTeamShowerThoughtsPrompt = ai.definePrompt({
  name: 'summariseTeamShowerThoughtsPrompt',
  input: {schema: SummarizeTeamShowerThoughtsInputSchema},
  output: {schema: SummarizeTeamShowerThoughtsOutputSchema},
  prompt: `You are an AI assistant tasked with summarising team "Shower Thoughts". Please provide all output in British English.
Your goal is to extract common themes, urgent concerns, and positive sentiments from a collection of anonymous feedback.

Here are the "Shower Thoughts" to analyse:
{{#each showerThoughts}}
- {{{this}}}
{{/each}}

Based on the provided "Shower Thoughts", please identify:
1. Common Themes: List the recurring subjects or topics.
2. Urgent Concerns: List any issues that seem critical or require immediate attention.
3. Positive Sentiments: List any expressions of gratitude, satisfaction, or good ideas.

Respond in JSON format according to the output schema.`,
});

const summariseTeamShowerThoughtsFlow = ai.defineFlow(
  {
    name: 'summariseTeamShowerThoughtsFlow',
    inputSchema: SummarizeTeamShowerThoughtsInputSchema,
    outputSchema: SummarizeTeamShowerThoughtsOutputSchema,
  },
  async input => {
    const {output} = await summariseTeamShowerThoughtsPrompt(input);
    return output!;
  }
);
