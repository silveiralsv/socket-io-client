import Chat from "@/components/chat";
import { cookies } from "next/headers";

export default async function ChatPage() {
  // Get the token from server-side cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;

  return (
    <div className="flex flex-col gap-4 p-4 bg-slate-600 h-screen w-screen">
      {token && <Chat token={token} />}
    </div>
  );
}
