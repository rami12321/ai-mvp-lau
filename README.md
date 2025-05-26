# Startup Idea Validator

A minimalist full-stack web app that lets users get mentor-style AI feedback on their startup ideas. Built with Next.js, TypeScript, Tailwind CSS, and OpenAI’s GPT API, it demonstrates a complete end-to-end flow:

1. **Frontend**: user enters a 1–3 sentence idea  
2. **Backend**: sends the idea to OpenAI with a structured prompt  
3. **AI**: returns a JSON payload with a verdict, explanation bullets, and a suggestion  
4. **Frontend**: renders the feedback in a polished UI  

---

## Features

- **Prompt engineering**: instructs the AI to behave like a startup mentor  
- **Strict JSON parsing**: removes code fences and ensures valid output  
- **Polished UI**: Tailwind-powered, with icons, loading spinners, char counter  
- **Modular code**: clear separation of concerns (lib, types, components, pages)  

---
 Project Structure
lib/aiClient.ts
Handles AI integration: constructs the prompt, calls OpenAI, strips markdown fences, and parses JSON.

types/index.ts
Defines the AIResult interface used throughout the app:

interface AIResult {
  verdict: "Promising" | "Needs Work";
  explanation: string[];
  suggestion?: string;
}
components/IdeaForm.tsx
A controlled component for idea input, showing a character counter, a submit button with spinner, and proper focus styling.

components/ResultDisplay.tsx
Displays the AI’s feedback with icons, bullet points, and a callout box for suggestions.

pages/api/askai.ts
A Next.js API Route that:

Validates the HTTP method and input

Calls validateIdea from aiClient.ts

Logs input/output for debugging

Returns the parsed AI result or an error JSON

pages/index.tsx
The main client page, which uses React hooks for state, ties together IdeaForm and ResultDisplay inside a responsive layout with a gradient background.

---

Testing the Flow 
Start your dev server: npm run dev (if locally)

Enter a sample idea, like:

“An app that lets commuters share real-time updates on public transit delays.”

Click Submit

Observe the loading spinner, then the AI feedback card.
