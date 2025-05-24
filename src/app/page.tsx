"use client";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Visualizer from "@/components/Visualizer";
import Chat from "@/components/Chat";
import Speech from '@/components/speech';

export default function Home() {
  return (
    <div className="flex items-center bg-blue-200 w-screen min-h-screen justify-center mx-auto gap-4">
      <main className="w-full flex">
        <div className="flex flex-col items-center bg-black h-[90vh] w-[80vw] mx-auto justify-between overflow-hidden p-4">

          <div className="h-1/2 w-full bg-white">
            <Visualizer />
            <Speech />
          </div>

          <div className="bg-green-400 w-full h-1/2">
            <Chat />
          </div>

        </div>
      </main>
    </div>
  );
}
