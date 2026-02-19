import { Prisma } from '@prisma/client';
import { CreateInputtedSessionDto } from '../dtos/CreateInputtedSessionDto';

export class InputtedSessionMapper {
  static toPrismaCreate(
    dto: CreateInputtedSessionDto,
    soundIds: string[],
    userId: string
  ): Prisma.InputtedSessionCreateInput {
    return {
      startTime: new Date(dto.startTime),
      endTime: new Date(dto.endTime),
      date: new Date(dto.date),
      prompt: dto.prompt,
      chosenDuration: dto.chosenDuration,
      timeOfDay: dto.timeOfDay,
      mood: dto.mood,
      activity: dto.activity,
      environment: dto.environment,
      temperature: dto.temperature,
      season: dto.season,
      temperatureUnit: dto.temperatureUnit,

      user: {
        connect: { id: userId },
      },

      sessionSounds: soundIds && soundIds.length > 0
        ? {
            create: soundIds.map((soundId) => ({
              sound: { connect: { id: soundId } },
              volume: 1,                            // default volume
              duration: dto.chosenDuration,         // full session duration
              startingTime: 0,                      // starts at 0
              endingTime: dto.chosenDuration,       // matches duration
            })),
          }
        : undefined,
    };
  }
}
