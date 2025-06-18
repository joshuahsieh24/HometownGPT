// app/api/ask/route.ts

import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import cityData from '@/data/citydata.json';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { question, radius } = await req.json();

    const context = cityData.map((entry) => `• ${entry.text}`).join('\n');

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
            role: "system",
            content: `You are HometownGPT, a helpful assistant focused on San Jose, California.
          
          When possible, use the context provided below to answer user questions about events, road closures, crime reports, or anything time-sensitive. If the context is not useful, you may use your own general knowledge — but always keep your answers specific to San Jose.
          
          Respond clearly and concisely. Avoid overexplaining. Use bullet points if listing multiple items.
          
          
          
          Context:
          ${context}`
          },
        {
          role: 'user',
          content: `Radius: ${radius} miles\nQuestion: ${question}`,
        },
      ],
      temperature: 0.4,
    });

    const answer = completion.choices[0].message.content;
    return NextResponse.json({ answer });
  } catch (err: any) {
    console.error('[GPT ERROR]', err);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
