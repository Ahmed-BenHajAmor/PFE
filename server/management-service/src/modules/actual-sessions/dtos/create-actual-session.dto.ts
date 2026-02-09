import { IsDateString, IsInt, IsUUID } from "class-validator";

export class CreateActualSessionDto {
  @IsUUID()
  inputtedSessionId: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  actualEndTime: string;

  @IsInt()
  actualDuration: number;
}
