import Avatar from '@/components/Avatar';
import { Canvas } from "@react-three/fiber";

export default function AvatarVisuals(){
    return(
        <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} />
              <Avatar></Avatar>
            </Canvas>
    );
}