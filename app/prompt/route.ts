import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from 'dotenv';

dotenv.config();

export async function POST(request: Request) {
    const body = await request.json();
    let prompts = JSON.parse(body?.body?.prompts);

    if (!prompts || prompts.length === 0) {
        return NextResponse.json({ message: "No prompts provided" }, { status: 400 });
    }

    let prompt = prompts.join("\n");

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}],
    });  

    let answer = chatCompletion.data?.choices[0]?.message?.content;

    return NextResponse.json({ answer }, { status: 200 });
}