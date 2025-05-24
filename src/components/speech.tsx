"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "./chatStore";

export default function Speech() {
  const { audioURL } = useChatStore();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!audioURL) return;
    const audio = audioRef.current!;
    audio.src = audioURL;
    audio.play();
  }, [audioURL]);

  return <audio ref={audioRef} style={{ display: "none" }} />;
}
