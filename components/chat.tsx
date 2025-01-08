/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type Message = {
  text: string;
  user: string;
  timestamp: Date;
};

type ChatProps = {
  token: string;
};
export default function Chat(props: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
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
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("connect_error", (err) => {
      console.log(err instanceof Error); // true
      console.log(err.message); // not authorized
    });

    socket.on("message", (message: string, username: string) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, timestamp: new Date(), user: username },
      ]);
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
    console.log("socket", socketRef);
    socketRef.current?.emit("message", input.value);
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
