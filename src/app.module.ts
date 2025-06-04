import { Module } from '@nestjs/common';
import { MeetingService } from './meeting/meeting.service';
import { RecorderService } from './recorder/recorder.service';
import { ChatGptService } from './summarizer/chatgpt.service';
import { WhisperService } from './transcription/whisper.service';
import { MeetingController } from './meeting/meeting.controller';
import { ConfigModule } from '@nestjs/config';

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
