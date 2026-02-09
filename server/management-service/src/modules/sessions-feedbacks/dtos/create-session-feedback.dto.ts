import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateSessionFeedbackDto {
  @IsUUID()
  sessionId: string;

  @IsString()
  @IsNotEmpty()
  feeling: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
