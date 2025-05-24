// example.mts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import fs from "node:fs";

const elevenlabs = new ElevenLabsClient();

const voice = await elevenlabs.voices.ivc.create({
    name: "My Voice Clone",
    // Replace with the paths to your audio files.
    // The more files you add, the better the clone will be.
    files: [
        fs.createReadStream(
            "./public/audio/1.mp3",
        ),
    ],
});

console.log(voice.voiceId);
