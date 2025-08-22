import { CheckCircle } from "lucide-react";

export default function ApiKeyNotice() {
  return (
    <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="flex items-start">
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 mr-3" />
        <div>
          <h3 className="text-green-800 dark:text-green-300 font-medium mb-2">
            AI Powered by Together AI
          </h3>
          <p className="text-green-700 dark:text-green-400 text-sm">
            PrepMind uses Together AI's language models through its API to generate provide live tutoring for SAT, ACT, and AP exams.
          </p>
        </div>
      </div>
    </div>
  );
}
