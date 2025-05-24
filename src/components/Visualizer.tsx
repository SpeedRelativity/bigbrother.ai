"use client";
import { useEffect, useRef } from "react";
import { useChatStore } from './chatStore';

export default function Visualizer() {
  const { audioURL } = useChatStore()
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    
    const canvas = canvasRef.current;
    const audio = audioRef.current;
    if (!canvas || !audio) return;
    audio.src = audioURL
    audio.play();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let audioCtx: AudioContext;
    let analyser: AnalyserNode;
    let dataArray: Uint8Array;
    let bufferLength: number;

    const handlePlay = () => {
      if (!audioCtx) {
        audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 2048;
        bufferLength = analyser.fftSize;
        dataArray = new Uint8Array(bufferLength);
      }

      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      const draw = () => {
        analyser.getByteTimeDomainData(dataArray);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 2;
        ctx.beginPath();

        const centerY = canvas.height / 2;
        const minEnvelope = 0.3;
        const maxEnvelope = 1.0;
        const sliceWidth = canvas.width / bufferLength;

        for (let i = 0; i < bufferLength; i++) {
          const x = i * sliceWidth;
          const rawEnv = Math.sin((Math.PI * x) / canvas.width);
          const envelope = minEnvelope + (maxEnvelope - minEnvelope) * rawEnv;

          const v = dataArray[i] / 128.0;
          const displacement = (v - 1) * centerY;
          const y = centerY + displacement * envelope;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, centerY);
        const grad = ctx.createLinearGradient(0,0,canvas.width,0);
        grad.addColorStop(0, "rgba(89, 0, 255, 0)");
        grad.addColorStop(0.5, "rgb(255, 0, 0)");
        grad.addColorStop(1, "rgba(0, 43, 185, 0)");
        ctx.strokeStyle = grad;

        ctx.stroke();
        requestAnimationFrame(draw);
      };

      draw();
    };

    audio.addEventListener("play", handlePlay);
    return () => {
      audio.removeEventListener("play", handlePlay);
    };
  }, [audioURL]);

  return (
    <div className="…">
      <canvas ref={canvasRef} width={500} height={300} />
      <audio ref={audioRef} controls />
    </div>
  )
}
