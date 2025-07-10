"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6">
        <circle cx="60" cy="60" r="60" fill="#E0F2FE" />
        <path d="M60 30C45 30 35 45 35 60C35 75 60 110 60 110C60 110 85 75 85 60C85 45 75 30 60 30Z" fill="#34D399" stroke="#059669" strokeWidth="3" />
        <circle cx="60" cy="60" r="10" fill="#fff" stroke="#059669" strokeWidth="3" />
        <circle cx="60" cy="60" r="4" fill="#34D399" />
      </svg>
      <h1 className="text-5xl font-extrabold text-green-700 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">You are lost in the map</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">The page you are looking for doesn't exist or you don't have access to it. Let's help you get back on track!</p>
      <Link href="/" className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition">Back to Home</Link>
    </div>
  );
} 