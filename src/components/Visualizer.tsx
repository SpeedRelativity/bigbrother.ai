"use client";
import { useEffect, useRef } from "react";


export default function Visualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null) // Give me a ref that will later point to a canvas, but starts empty
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    const audio = audioRef.current;

    if (!canvas || !audio) return;

    const ctx= canvas.getContext("2d");
    if (!ctx) return;

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 2048;

    const bufferLength = analyser.fftSize
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      analyser.getByteTimeDomainData(dataArray);

      ctx.clearRect(0,0,canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.beginPath();
        const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      requestAnimationFrame(draw);
    };
    
    draw();

    },[]);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <canvas className="bg-red-300" width={500} height={300}  ref={canvasRef} ></canvas>
      <audio ref={audioRef} src="/audio/sample.mp3" controls></audio>
    </div>
    
  )

  
}