"use client";
import { useState } from 'react';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  error?: string;
}

const Login = ({ onLogin, error }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 rounded"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button type="submit" className="bg-green-600 text-white rounded p-2 font-semibold hover:bg-green-700 transition">Login</button>
    </form>
  );
};

export default Login; 