"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Capture error from URL params
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      console.log("Error param:", errorParam);
      setError(
        errorParam === "CredentialsSignin"
          ? "Invalid email or password"
          : "An error occurred during sign in"
      );
    }
  }, [searchParams]);
  const handleLogin = async (e: { preventDefault: () => void }) => {
    if (e) e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      console.log("🔑 Starting login attempt with:", email);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/dashboard", // Explicitly set callback URL
      });
      console.log("📩 Sign-in response:", JSON.stringify(result));
      if (result?.ok) {
        console.log("✅ Login successful");
        // Wait a moment before redirecting
        setTimeout(() => {
          router.push("/dashboard");
        }, 100);
        return;
      } else {
        console.log("❌ Login failed:", result?.error);
        setError(
          `Authentication failed: ${result?.error || "Invalid credentials"}`
        );
      }
    } catch (err) {
      console.error("💥 Login error:", err);
      setError("An unexpected error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400">
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
          <button
            type="button"
            onClick={async () => {
              try {
                console.log("🔍 Debug: Checking if user exists");
                const userResponse = await fetch("/api/debug/user", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });

                const userData = await userResponse.json();
                console.log("👤 User data:", userData);

                // Now test authentication with signIn
                console.log("🔑 Debug: Testing authentication");
                handleLogin;
              } catch (e) {
                console.error("💥 Debug test failed:", e);
              }
            }}
            className="text-sm text-blue-600 hover:underline mt-2">
            Debug Authentication
          </button>
        </form>
      </div>
    </div>
  );
}
