import { NextResponse } from "next/server";

// So here we are using the OpenAI API to generate a response to the user's message
export async function POST(request: Request) {
    const { message }= await request.json();
    // here we are fetching the user response through the OpenAI API, which returns a completion in the form of a json file.
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type' :'application/json',
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [{role: 'user', content: message}],
            stream: true,
        }),
    })

    // here we return the Next.js response with the data from the OpenAI API from "response's body"
    return new NextResponse(response.body, {
        headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        connection: 'keep-alive',
        },
    });
}