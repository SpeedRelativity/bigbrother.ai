"use client";
import {Button} from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AgentAvatar from '@/components/Avatar';
import { Canvas } from "@react-three/fiber";
export default function Home() {
  return (
    <div className="background-container flex items-center bg-blue-200 w-screen min-h-screen justify-center mx-auto">
      <main className='w-full flex justify-center'>
        <div className="inner-container flex flex-col items-center bg-red-500 h-[80vh] w-[50vw] mx-auto justify-center p-2">
          <div className="bg-white w-full h-full ">
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <AgentAvatar></AgentAvatar>
            </Canvas>
            
          </div>
          <div className="bg-green-400 w-full h-[30%]">
            AI response here...
          </div>
          <div className="flex bg-green-400 w-full">
            <div className="w-[80%] bg-purple-400">
              <Input placeholder="What's on your mind?" className="placeholder-white "/>
            </div>
            <Button className='w-[20%]'>Send</Button>
          </div>

        </div>
        
          
      </main>
    </div>
  );
}
