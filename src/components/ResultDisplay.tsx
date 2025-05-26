import { FC } from "react";
import { AIResult } from "@/types";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";

interface ResultDisplayProps {
  result: AIResult;
}

export const ResultDisplay: FC<ResultDisplayProps> = ({ result }) => (
  <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
    <div className="flex items-center mb-4">
      {result.verdict === "Promising" ? (
        <HiCheckCircle className="text-green-500 text-3xl mr-2" />
      ) : (
        <HiXCircle className="text-red-500 text-3xl mr-2" />
      )}
      <h2 className="text-2xl font-semibold">
        {result.verdict === "Promising" ? "Promising" : "Needs Work"}
      </h2>
    </div>
    <ul className="list-disc ml-6 space-y-2 text-gray-700">
      {result.explanation.map((pt, idx) => (
        <li key={idx}>{pt}</li>
      ))}
    </ul>
    {result.suggestion && (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-500">
        <h3 className="font-medium mb-1">Improvement Suggestion:</h3>
        <p className="text-gray-800">{result.suggestion}</p>
      </div>
    )}
  </div>
);