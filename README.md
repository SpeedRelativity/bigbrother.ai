## Youtube Link: https://youtu.be/rKHyaduNo_k   

# Interactive Voice-Cloned AI Chat Interface
An interactive chatbot application leveraging advanced generative AI and personalized voice technology to create a unique conversational experience. Users can communicate with an AI-powered assistant that responds dynamically in a realistic, cloned voice, accompanied by engaging real-time audio waveform visualizations.

## Project Overview

This project integrates state-of-the-art technologies:

* **Conversational AI:** Utilizes Grok's LLaMA-based large language model for intelligent and contextually aware responses.
* **Voice Cloning & Text-to-Speech:** Implements ElevenLabs’ advanced TTS API to generate natural, human-like speech cloned from personalized voice samples.
* **Interactive UI & Visualization:** Features a dynamic React frontend with live waveform visualizations, enhancing interactivity and immersion.

## Key Features

* **AI Chat Responses:** Real-time conversational responses powered by Grok's generative AI.
* **Personalized Voice Output:** Realistic speech synthesis using ElevenLabs’ voice cloning capability.
* **Real-time Audio Visualization:** Visually engaging waveform animations synchronized to AI-generated speech.
* **Responsive Frontend:** Built using Next.js, React, and styled with Tailwind CSS for optimal user experience.
* **Asynchronous Processing:** Efficient backend implementation to handle real-time data streaming.

## Technologies Used

* **Frontend:** React, Next.js, Tailwind CSS
* **Backend:** Node.js, Next.js API Routes
* **AI & APIs:** Grok LLaMA, ElevenLabs Text-to-Speech API
* **Visualization:** Web Audio API, HTML5 Canvas
* **State Management:** Zustand
* **Development & Collaboration:** Git, GitHub, VS Code

## Setup & Installation


Clone the repository and install dependencies:

```bash
git clone [YOUR_REPO_URL]
cd [PROJECT_DIRECTORY]
npm install
```
MAKE SURE TO CREATE A .ENV FILE AND ENTER YOUR API KEYS  
ALSO REPLACE THE __API_KEY__ spots with your api keys in route.ts and other related files.  
REPLACE THE AUDIO FILE PATH WITH YOUR AUDIO CLIP.
GENERATE A VOICE ID FROM ELEVENLABS AUDIO BY RUNNING:
```bash
npx tsx example.ts
```
Use that voiceId inside the speech.tsx model.


Start the development server:

```bash
npm run dev
```

## Demo & Usage

1. Enter your prompt in the provided chat input.
2. Click "Send" to interact with the AI chatbot.
3. Listen and watch as the chatbot responds with audio in a cloned voice, visualized through the real-time waveform.

## Showcase

Include screenshots or GIFs demonstrating the application's features here.

## License

This project is licensed under the MIT License.

---

Feel free to contact me for further information or collaboration opportunities.
