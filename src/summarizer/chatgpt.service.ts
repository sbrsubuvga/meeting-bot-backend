import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatGptService {
  async summarize(text: string) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a meeting summarizer.' },
          { role: 'user', content: text }
        ]
      }),
    });
    const result = await response.json();
    return result.choices[0].message.content;
  }
}
