"use client";

import { useState } from "react";
import { useChatStore } from "./chatStore";

export default function Chat() {
  const [input, setInput] = useState("");
  const { response, setResponse, appendResponse, setAudioURL } = useChatStore();
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setResponse("");
    setAudioURL("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        message: input,
      }),
    });

    const reader = res.body?.getReader();
    if (!reader) {
      setLoading(false);
      return;
    }

    const decoder = new TextDecoder();
    let fullText = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n").filter((l) => l.startsWith("data:"));
      for (const line of lines) {
        const json = line.replace("data: ", "").trim();
        if (json === "[DONE]") break;
        try {
          const parsed = JSON.parse(json);
          const text = parsed.choices[0].delta.content;
          if (text) {
            fullText += text;
            for (const char of text) {
              appendResponse(char);
              await new Promise((r) => setTimeout(r, 10));
            }
          }
        } catch {}
      }
    }

    setLoading(false);

    if (fullText) {
      const ttsRes = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullText }),
      });
      const blob = await ttsRes.blob();
      setAudioURL(URL.createObjectURL(blob));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <div className="bg-gray-300 p-4 rounded whitespace-pre-wrap text-black">
        {response || "..."}
      </div>
      <textarea
        className="bg-purple-400 border p-2 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="What's up?"
      />
      <button
        onClick={handleSend}
        className="bg-black px-4 rounded text-white"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </div>
  );
}
