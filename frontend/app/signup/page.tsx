"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) router.replace("/dashboard");
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${baseUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) throw new Error(data.message || "Signup failed");

      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: any) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Signup
          </button>
        </form>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
