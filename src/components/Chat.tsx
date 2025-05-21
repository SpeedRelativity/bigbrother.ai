"use client";

import { useState } from "react";


export default function Chat(){
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if(!input.trim()) return;
        setLoading(true);

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: {'Content-Type' :'application/json'},
            body: JSON.stringify({message: input}),

        })

        const data = await res.json();
        setResponse(data.reply);
        setLoading(false);
    }

    return(
        
        <div className="flex flex-col gap-4 p-4 w-full">
            <div className="bg-gray-300 p-4 rounded min-h-[100px]"> {response}</div>
            <textarea className="bg-purple-400 border p-2 rounded" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What's up?"></textarea>
            <button onClick={handleSend} className="bg-black px-4 rounded text-white" disabled={loading}> {loading ? "Thinking...": "Send"} </button>
        </div>
    );
}