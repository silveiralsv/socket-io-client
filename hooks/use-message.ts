import { Message } from "@/app/types/message";
import { useAxios } from "./use-axios";
import { useEffect, useState } from "react";

export const useMessage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const apiClient = useAxios();

  const getMessages = async () => {
    const response = await apiClient.get(`/message`);
    console.log("response", response.data);
    setMessages(
      response.data.data.map((msg: any) => ({
        text: msg.text,
        user: msg.user?.name ?? "Unknown",
        timestamp: new Date(msg.createdAt),
      }))
    );
  };

  useEffect(() => {
    getMessages();
  }, []);

  return { messages, setMessages };
};
