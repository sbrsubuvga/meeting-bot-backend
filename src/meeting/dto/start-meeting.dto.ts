import { IsUrl, IsString } from 'class-validator';

export class StartMeetingDto {
  @IsString()
  platform: 'google-meet' | 'zoom' | 'teams';

  @IsUrl()
  url: string;

  @IsString()
  title: string;
}
