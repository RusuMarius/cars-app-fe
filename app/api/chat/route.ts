import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    console.log('Received message:', message); // Log the received message

    if (!message) {
      return NextResponse.json({ message: 'Message is required' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const completion = response.choices[0].message.content;

    return NextResponse.json({ message: completion }, { status: 200 });
  } catch (error) {
    console.error('Error processing the request:', error); // Log the error
    return NextResponse.json({ message: 'Something went wrong', error }, { status: 500 });
  }
}
