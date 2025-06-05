import { Injectable } from '@nestjs/common';
import { StartMeetingDto } from './dto/start-meeting.dto';
import { RecorderService } from '../recorder/recorder.service';
import { ChatGptService } from '../summarizer/chatgpt.service';
import { WhisperService } from '../transcription/whisper.service';
import { GoogleMeetBot } from '../bots/google-meet.bot';

@Injectable()
export class MeetingService {
  constructor(
    private readonly recorder: RecorderService,
    private readonly whisper: WhisperService,
    private readonly gpt: ChatGptService,
  ) {}

  async startMeeting({ platform, url, title }: StartMeetingDto) {
    const meetingId = Date.now();
    const outputPath = `recordings/${title}-${meetingId}.mp4`;

    // Join meeting with bot
    if (platform === 'google-meet') await GoogleMeetBot.join(url);

    // Start recording
    const ffmpeg = this.recorder.startRecording(outputPath);

    // Automatically stop after 30 minutes
    setTimeout(async () => {
      ffmpeg.kill('SIGINT');

      const transcript = await this.whisper.transcribe(outputPath);
      const summary = await this.gpt.summarize(transcript);

      // Store or return
      console.log({ summary });
    }, 1000 * 60 * 1); // 30 mins

    return { status: 'recording_started', meetingId };
  }
}
