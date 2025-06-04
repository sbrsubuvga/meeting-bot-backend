import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetingService } from './meeting/meeting.service';
import { RecorderService } from './recorder/recorder.service';
import { ChatGptService } from './summarizer/chatgpt.service';
import { WhisperService } from './transcription/whisper.service';
import { MeetingController } from './meeting/meeting.controller';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [MeetingController],
  providers: [
    MeetingService,
    RecorderService,
    WhisperService,
    ChatGptService,
  ],
})
export class AppModule {}
