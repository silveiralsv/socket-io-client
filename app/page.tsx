"use client";

import { useAuth } from "@/context/auth.context";

export default function Login() {
  const { login } = useAuth();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    await login(email, password);
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 bg-slate-400 p-4 max-w-xs m-auto">
        <h1 className="font-bold text-xl flex items-center justify-center">
          Log in
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
          <input
            className="bg-foreground  text-black p-2"
            placeholder="Email"
            name="email"
          />
          <input
            className="bg-foreground text-black p-2"
            placeholder="Password"
            name="password"
          />
          <button className="bg-slate-600 hover:bg-slate-500 transition-all duration-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
