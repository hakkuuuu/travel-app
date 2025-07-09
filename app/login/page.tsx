"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Login from '@/components/Login';
import type { LoginSchema } from '@/constants';

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (username: string, password: string) => {
    setError("");
    const payload: LoginSchema = { username, password };
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);
        router.push("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Login onLogin={handleLogin} error={error} />
      <div className="mt-4 text-center">
        <span className="text-gray-700">Don't have an account yet?</span>
        <a href="/register" className="ml-2 text-green-700 font-semibold hover:underline">Register</a>
      </div>
    </div>
  );
} 