import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatGptService {
    constructor(private readonly configService: ConfigService) {}

  async summarize(text: string) {
        const openAiKey = this.configService.get<string>('OPENAI_API_KEY');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openAiKey}`,
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
