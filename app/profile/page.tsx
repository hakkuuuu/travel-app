"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ProfilePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (isLoggedIn) {
      setUsername(localStorage.getItem('username') || "");
    } else {
      setUsername("");
    }
  }, []);

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">You are not logged in.</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80 flex flex-col items-center gap-4">
        <Image src="/user.svg" alt="profile" width={64} height={64} className="rounded-full bg-green-100" />
        <h2 className="text-2xl font-bold">{username}</h2>
        <p className="text-gray-600">Welcome to your profile page!</p>
      </div>
    </div>
  );
} 