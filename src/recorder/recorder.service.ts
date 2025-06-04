import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class RecorderService {
  startRecording(output: string) {
    return spawn('ffmpeg', [
      '-y',
      '-f', 'x11grab',
      '-i', ':99.0',
      '-f', 'pulse',
      '-i', 'default',
      '-c:v', 'libx264',
      '-preset', 'ultrafast',
      '-crf', '0',
      '-c:a', 'aac',
      output
    ]);
  }
}
