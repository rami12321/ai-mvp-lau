import { NextApiRequest, NextApiResponse } from "next";
import { validateIdea } from "@/lib/aiClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("/api/askai called with:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { idea } = req.body;
  if (typeof idea !== "string" || !idea.trim()) {
    return res.status(400).json({ error: "Invalid idea input" });
  }

  try {
    const result = await validateIdea(idea.trim());
    console.log("AI result:", result);
    return res.status(200).json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error in /api/askai:", message);
    return res.status(500).json({ error: message });
  }
}