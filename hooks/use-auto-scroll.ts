import { useEffect, useRef } from "react";

export const useAutoScroll = <T>(dependencies: T[]) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, dependencies);

  return scrollRef;
};
