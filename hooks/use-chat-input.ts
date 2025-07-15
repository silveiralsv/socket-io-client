import { FormEvent } from "react";

type UseChatInputProps = {
  onSendMessage: (message: string) => void;
};

export const useChatInput = ({ onSendMessage }: UseChatInputProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('input[type="text"]') as HTMLInputElement;

    if (input && input.value.trim()) {
      onSendMessage(input.value.trim());
      input.value = "";
    }
  };

  return {
    handleSubmit,
  };
};
