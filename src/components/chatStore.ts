import { create } from "zustand";

type ChatStore = {
  response: string
  audioURL: string
  setResponse: (val:string) => void
  appendResponse: (val:string) => void
  setAudioURL: (url:string) => void
}
export const useChatStore = create<ChatStore>((set) => ({
  response: '',
  audioURL: '',
  setResponse: (val) => set({ response: val }),
  appendResponse: (val) => set((s) => ({ response: s.response + val })),
  setAudioURL: (url) => set({ audioURL: url }),
}))
