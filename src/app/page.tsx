"use client";
import {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Visualizer from "@/components/Visualizer";
import Chat from "@/components/Chat";
export default function Home() {
  return (
    <div className="background-container flex items-center bg-blue-200 w-screen min-h-screen justify-center mx-auto gap-4">
      <main className='w-full flex justify-center'>
        <div className="inner-container flex flex-col items-center bg-red-500 h-[80vh] w-[60vw] mx-auto justify-between overflow-hidden justify-center px-4">
          <div className="bg-white w-full h-full ">
            <Visualizer/>
            
          </div>  
          <div className="bg-green-400 w-full">
            <Chat/>
          </div>
        </div>
      </main>
    </div>
  );
}
