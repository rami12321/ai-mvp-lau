import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("Tell me a joke");
  const [response, setResponse] = useState("");

  const askAI = async () => {
    const { data } = await axios.post("/api/hello", { prompt });
    setResponse(data.text);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">AI MVP Starter</h1>

      <textarea
        className="w-full border p-2 mb-4"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={askAI}
      >
        Ask AI
      </button>

      {response && (
        <pre className="mt-6 bg-gray-100 p-4 rounded whitespace-pre-wrap">{response}</pre>
      )}
    </main>
  );
}
