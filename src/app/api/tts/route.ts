import { NextResponse } from "next/server"
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js"
import { Readable } from "stream"
import { Buffer } from "buffer"

const eleven = new ElevenLabsClient({ apiKey: process.env.ELEVEN_LABS_API_KEY! })

export async function POST(request: Request) {
  const { text } = await request.json()
  const stream: Readable = await eleven.textToSpeech.convert("__API_KEY__", {
    text,
    modelId: "eleven_multilingual_v2",
    outputFormat: "mp3_44100_128",
  })
  const chunks: Buffer[] = []
  for await (const c of stream) chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c))
  const buffer = Buffer.concat(chunks)
  return new NextResponse(buffer, { status: 200, headers: { "Content-Type": "audio/mpeg" } })
}
