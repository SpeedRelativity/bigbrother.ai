
import "dotenv/config"; // Load variables from .env
import { Readable } from 'stream'
import { Buffer } from 'buffer'
import { ElevenLabsClient} from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_LABS_API_KEY!,
});
export async function getSpeechBlob(text: string): Promise<Blob> {
  // returns a Node.js Readable stream
  const audioStream: Readable = await elevenlabs.textToSpeech.convert('__API_KEY__', {
    text,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
  })

  // accumulate chunks
  const chunks: Buffer[] = []
  for await (const chunk of audioStream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  // merge into one Buffer
  const buffer = Buffer.concat(chunks)

  // now Blob accepts it
  return new Blob([buffer], { type: 'audio/mpeg' })
}
