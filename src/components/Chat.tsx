"use client";

import { useState } from "react";


export default function Chat(){
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handleSend = async () => {
        // check if input is empty skip if blank. Add async function to use await.
        if(!input.trim()) return;
        setLoading(true);

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type' :'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                message: input 
            }),

        })
        // here we are streaming the response from the OpenAI API instead of getting it all at once.
        const reader = res.body?.getReader();
        
        const decoder = new TextDecoder();
        if (!reader) {
            return;
        }
        // loop to get binary chunks from the stream and decode into json
        while(true){
            const {value, done} = await reader.read();
            if(done){
                break
            }
            const chunk = decoder.decode(value);
            console.log('Raw chunk: ', chunk);
            const lines = chunk.split('\n').filter(line => line.startsWith('data:'));
            for (const line of lines){
                const json = line.replace('data: ', '').trim();
                if(json === '[DONE]') break;
                try{
                const parsed = JSON.parse(json);
                const text = parsed.choices[0].delta.content;
                if(text){
                    for(const char of text){
                        await new Promise((resolve) => setTimeout(resolve, 10));
                        setResponse((prev) => prev + char);
                    }
                }
                }
                catch (err){
                    console.error(err);
                }
            }
            
        }
        setLoading(false);
    }

    return(
        
        <div className="flex flex-col gap-4 p-4 w-full">
            <div className="bg-gray-300 p-4 rounded whitespace-pre-wrap text-black"> {response || '...'}</div>
            <textarea className="bg-purple-400 border p-2 rounded" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What's up?"></textarea>
            <button onClick={handleSend} className="bg-black px-4 rounded text-white" disabled={loading}> {loading ? "Thinking...": "Send"} </button>
        </div>
    );
}