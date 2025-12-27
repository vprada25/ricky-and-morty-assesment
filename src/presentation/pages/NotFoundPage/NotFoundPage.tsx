import { Button } from "@/presentation/components/atoms";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Character Not Found
            </h2>
            <p className="text-text-secondary">
              Oops! The character you're looking for doesn't exist in this
              dimension.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <svg
            className="w-64 h-64 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/")}
            className="w-full"
            variant="primary"
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
