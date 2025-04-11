"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState(
    "An authentication error occurred"
  );

  useEffect(() => {
    const error = searchParams.get("error");
    console.log("Auth error:", error);

    if (error) {
      switch (error) {
        case "CredentialsSignin":
          setErrorMessage("Invalid email or password");
          break;
        case "AccessDenied":
          setErrorMessage(
            "Access denied. You don't have permission to access this resource."
          );
          break;
        default:
          setErrorMessage(`Authentication error: ${error}`);
      }
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Authentication Error
        </h1>
        <p className="mb-6 text-gray-700">{errorMessage}</p>
        <div className="flex justify-between">
          <Link
            href="/auth/sign-in"
            className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
