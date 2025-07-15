"use client";
import { useMessage } from "@/hooks/use-message";
import { useSocket } from "@/hooks/use-socket";
import { useChatInput } from "@/hooks/use-chat-input";
import { useAutoScroll } from "@/hooks/use-auto-scroll";

type ChatProps = {
  token: string;
};

export default function Chat({ token }: ChatProps) {
  const { messages, setMessages } = useMessage();
  const scrollRef = useAutoScroll([messages]);

  const { sendMessage } = useSocket({
    token,
    onMessage: (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    },
    onConnect: () => {
      console.log("Chat connected successfully");
    },
    onDisconnect: () => {
      console.log("Chat disconnected");
    },
    onError: (error) => {
      console.error("Socket error:", error);
    },
  });

  const { handleSubmit } = useChatInput({
    onSendMessage: sendMessage,
  });

  return (
    <>
      <div id="timeline" className="bg-slate-400 flex-grow overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-4 p-4">
            <div className="text-white">{message.user}</div>
            <div className="text-white">{message.text}</div>
            <div className="text-white">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>
      <form className="flex gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-slate-400 text-white p-4 text-xl flex-grow"
          placeholder="Type your message..."
        />
        <button className="bg-slate-400 text-white p-4 text-xl">Send</button>
      </form>
    </>
  );
}
