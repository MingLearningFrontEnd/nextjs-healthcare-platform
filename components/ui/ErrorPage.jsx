import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const ErrorPage = ({ 
  title = "Oops! Something went wrong",
  message = "An error occurred while loading the page.",
  error,
  showRetry = true 
}) => {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <div className="min-h-screen py-12 flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">
          {title}
        </h2>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        {error && (
          <div className="mb-6 p-3 bg-red-50 rounded-md">
            <p className="text-sm text-red-600">
              Error: {error}
            </p>
          </div>
        )}
        {showRetry && (
          <div className="flex justify-center gap-4">
            <Button
              onClick={handleRetry}
              className="bg-primary hover:bg-primary/90"
            >
              Try Again
            </Button>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
            >
              Go Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage; 