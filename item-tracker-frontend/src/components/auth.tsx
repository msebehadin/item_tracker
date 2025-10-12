// src/LoginPage.tsx
import React, { useState } from "react";
import * as Label from "@radix-ui/react-label";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Shop Tracker Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label.Root htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </Label.Root>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <Label.Root htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </Label.Root>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 outline-none"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
