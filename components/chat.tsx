/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMessage } from "@/hooks/use-message";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const TOPIC = "test";

type ChatProps = {
  token: string;
};
export default function Chat(props: ChatProps) {
  const { messages, setMessages } = useMessage();
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // TODO send to env
    const socket = io("http://localhost:3001", {
      auth: {
        token: props.token,
      },
    });

    socketRef.current = socket;
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("join", TOPIC);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("connect_error", (err) => {
      console.log(err instanceof Error); // true
      console.log(err.message); // not authorized
    });

    socket.on(TOPIC, (message: any) => {
      console.log("message received", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: message.text,
          timestamp: new Date(message.timestamp),
          user: message.user,
        },
      ]);
    });

    socket.on("publish", (topic: string, message: string) => {
      console.log("publish", topic, message);
    });

    return () => {
      console.log("disconnecting");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (event: any) => {
    event.preventDefault();
    const input = event.target[0];
    socketRef.current?.emit("publish", TOPIC, input.value);
    input.value = "";
  };

  return (
    <>
      <div id="timeline" className="bg-slate-400 flex-grow overflow-y-auto ">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-4 p-4">
            <div className="text-white">{message.user}</div>
            <div className="text-white">{message.text}</div>
            <div className="text-white">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="flex gap-4" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="bg-slate-400 text-white p-4 text-xl flex-grow"
        />
        <button className="bg-slate-400 text-white p-4 text-xl">Send</button>
      </form>
    </>
  );
}
