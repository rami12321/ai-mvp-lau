export interface AIResult {
  verdict: "Promising" | "Needs Work";
  explanation: string[];
  suggestion?: string;
}

