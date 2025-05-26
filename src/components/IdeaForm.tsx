"use client";
import { FC } from "react";
import { HiLightBulb, HiOutlinePaperAirplane } from "react-icons/hi";

interface IdeaFormProps {
  idea: string;
  setIdea: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export const IdeaForm: FC<IdeaFormProps> = ({ idea, setIdea, onSubmit, loading }) => (
  <div className="space-y-2">
    <label htmlFor="idea" className="text-lg font-medium">
      <HiLightBulb className="inline-block mr-1 text-yellow-500" />
      Your Startup Idea
    </label>
    <textarea
      id="idea"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
      rows={3}
      placeholder="Describe your idea in 1–3 sentences"
      value={idea}
      onChange={(e) => setIdea(e.target.value)}
      disabled={loading}
      maxLength={300}
    />
    <div className="flex justify-between items-center">
      <small className="text-sm text-gray-500">{idea.length}/300 chars</small>
      <button
        className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md disabled:opacity-50"
        onClick={onSubmit}
        disabled={loading || !idea.trim()}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 mr-2 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          <HiOutlinePaperAirplane className="mr-1 text-xl" />
        )}
        {loading ? "Analyzing" : "Submit"}
      </button>
    </div>
  </div>
);
