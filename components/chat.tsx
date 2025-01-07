/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
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
  console.log("@@@@@  -> props:", props);
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = io("http://localhost:3001", {
    auth: {
      token: props.token,
    },
  });

  useEffect(() => {
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
      console.log("@@@@@  -> message:", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, timestamp: new Date(), user: username },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = (event: any) => {
    event.preventDefault();
    const input = event.target[0];
    console.log("socket", socket);
    socket?.emit("message", input.value);
    input.value = "";
  };

  return (
    <>
      <div id="timeline" className="bg-slate-400 flex-grow">
        {messages.map((message, index) => (
          <div key={index} className="flex gap-4 p-4">
            <div className="text-white">{message.user}</div>
            <div className="text-white">{message.text}</div>
            <div className="text-white">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
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
