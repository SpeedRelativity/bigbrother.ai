"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Avatar() {
  const meshRef = useRef<any>(null);

  useFrame(({clock}) => {
    
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t) * 0.5;
      meshRef.current.rotation.y += 0.03;
      meshRef.current.rotation.x += 0.02;
      meshRef.current.material.color.set("hsl(" + (clock.elapsedTime * 40) % 360 + ", 100%, 50%)");

    }
  });

  return (
    <mesh ref={meshRef}>
      
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
