import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';

@Injectable()
export class WhisperService {
  async transcribe(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(`whisper "${filePath}" --model base`, (err, stdout) => {
        if (err) reject(err);
        resolve(stdout);
      });
    });
  }
}
