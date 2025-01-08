"use client";
import { useAuth } from "@/context/auth.context";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    try {
      await login(email, password);
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-slate-400 p-4 max-w-xs m-auto">
        <h1 className="font-bold text-xl flex items-center justify-center text-white">
          Log in
        </h1>
        {error && <p className="text-red-500 text-xs font-semibold">{error}</p>}
        <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
          <input
            className="bg-foreground  text-black p-2 rounded-md"
            placeholder="Email"
            name="email"
          />
          <input
            className="bg-foreground text-black p-2 rounded-md"
            placeholder="Password"
            name="password"
            type="password"
          />
          <button className="bg-slate-600 hover:bg-slate-500 transition-all duration-100 rounded-md p-2 select-none">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
