import { Controller, Post, Body } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { StartMeetingDto } from './dto/start-meeting.dto';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post('start')
  async start(@Body() body: StartMeetingDto) {
    return this.meetingService.startMeeting(body);
  }
}