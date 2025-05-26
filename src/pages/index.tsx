"use client";
import { useState, ReactNode } from "react";
import { IdeaForm } from "@/components/IdeaForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import { AIResult } from "@/types";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Startup Idea Validator</h1>
        <p className="mt-2 text-lg text-gray-600">Get mentor-style AI feedback on your idea</p>
      </div>
      {children}
    </div>
  </div>
);

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/askai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setResult(data as AIResult);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {error && <p className="text-red-600 mb-4">Error: {error}</p>}
      <IdeaForm idea={idea} setIdea={setIdea} onSubmit={handleSubmit} loading={loading} />
      {result && <ResultDisplay result={result} />}
    </Layout>
  );}