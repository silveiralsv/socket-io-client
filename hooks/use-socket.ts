import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const TOPIC = "test";

type Message = {
  text: string;
  user: string;
  timestamp: Date;
};

type UseSocketProps = {
  token: string;
  onMessage: (message: Message) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
};

export const useSocket = ({
  token,
  onMessage,
  onConnect,
  onDisconnect,
  onError,
}: UseSocketProps) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // TODO: Move to environment variable
    const socket = io("http://localhost:3001", {
      auth: {
        token,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("join", TOPIC);
      onConnect?.();
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
      onDisconnect?.();
    });

    socket.on("connect_error", (err) => {
      console.log("Connection error:", err.message);
      onError?.(err);
    });

    socket.on(TOPIC, (message: any) => {
      console.log("Message received:", message);
      onMessage({
        text: message.text,
        timestamp: new Date(message.timestamp),
        user: message.user,
      });
    });

    return () => {
      console.log("Disconnecting socket");
      socket.disconnect();
    };
  }, [token, onMessage, onConnect, onDisconnect, onError]);

  const sendMessage = (message: string) => {
    if (socketRef.current) {
      socketRef.current.emit("publish", TOPIC, message);
    }
  };

  const isConnected = () => {
    return socketRef.current?.connected ?? false;
  };

  return {
    sendMessage,
    isConnected,
  };
};
