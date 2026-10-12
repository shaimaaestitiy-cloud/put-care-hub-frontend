"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DemoOwner = {
  id: string;
  name: string;
  email: string;
};

export default function OwnerLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Front-end demo only: no real password verification.
    const savedAccounts: DemoOwner[] = JSON.parse(
      localStorage.getItem("petCareDemoOwners") || "[]"
    );

    const account = savedAccounts.find(
      (owner) =>
        owner.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!account) {
      setError("Account not found. Please create an account first.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    // Temporary demo session.
    // Real authentication will be handled by the back-end.
    localStorage.setItem(
      "petCareDemoSession",
      JSON.stringify(account)
    );

    router.push("/owner/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#FFF9F1] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐾</div>

          <h1 className="text-3xl font-bold text-[#315C4B]">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to manage your pet&apos;s care
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm font-semibold text-[#315C4B] mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@example.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#315C4B] mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#315C4B] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Sign In 🐾
          </button>
        </form>

        <div className="text-center mt-7">
          <p className="text-gray-500">
            Don&apos;t have an account?
          </p>

          <button
            onClick={() => router.push("/owner/register")}
            className="text-[#E8874A] font-bold mt-1 hover:underline"
          >
            Create New Account
          </button>
        </div>

        <button
          onClick={() => router.push("/")}
          className="block mx-auto mt-6 text-sm text-gray-400 hover:text-[#315C4B]"
        >
          ← Back to Home
        </button>

      </div>
    </main>
  );
}