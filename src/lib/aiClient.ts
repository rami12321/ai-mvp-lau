import OpenAI from "openai";
import { AIResult } from "@/types";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const PROMPT_TEMPLATE = `
You are an experienced startup mentor and investor.
Evaluate the following startup idea based on:
• Does it solve a clear problem?
• Is it scalable or innovative?
• Is the idea clearly explained?
Respond in valid JSON with these fields:
- verdict: "Promising" or "Needs Work"
- explanation: an array of 1–2 brief bullet points justifying your verdict
- suggestion: one actionable improvement (if any)

Startup idea: "{idea}"
`.trim();

export async function validateIdea(idea: string): Promise<AIResult> {
  const prompt = PROMPT_TEMPLATE.replace("{idea}", idea);
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You evaluate startup ideas." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content!;
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/, '')
    .replace(/\s*```$/, '');

  try {
    return JSON.parse(cleaned) as AIResult;
  } catch (err) {
    throw new Error(`Invalid AI response: ${cleaned}`);
  }
}