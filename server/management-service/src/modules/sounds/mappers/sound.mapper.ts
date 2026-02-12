import { Prisma } from '@prisma/client';
import { CreateSoundDto } from '../dtos/create-sound.dto';
import { UpdateSoundDto } from '../dtos/update-sound.dto';

export class SoundMapper {
  static toCreateSound(dto: CreateSoundDto): Prisma.SoundCreateInput {
    return {
      title: dto.title,
      description: dto.description,
      totalDuration: dto.totalDuration,
      status: dto.status,
      url: dto.url,
      numberOfDownloads: dto.numberOfDownloads ?? 0,
      timeOfDay: dto.timeOfDay,
      mood: dto.mood,
      activity: dto.activity,
      environment: dto.environment,
      temperature: dto.temperature,
      temperatureUnit: dto.temperatureUnit,
      Season: dto.Season,
    };
  }

  static toUpdateSound(dto: UpdateSoundDto): Prisma.SoundUpdateInput {
    return {
      ...(dto.title !== undefined && { title: dto.title }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.totalDuration !== undefined && { totalDuration: dto.totalDuration }),
      ...(dto.status !== undefined && { status: dto.status }),
      ...(dto.url !== undefined && { url: dto.url }),
      ...(dto.numberOfDownloads !== undefined && { numberOfDownloads: dto.numberOfDownloads }),
      ...(dto.timeOfDay !== undefined && { timeOfDay: dto.timeOfDay }),
      ...(dto.mood !== undefined && { mood: dto.mood }),
      ...(dto.activity !== undefined && { activity: dto.activity }),
      ...(dto.environment !== undefined && { environment: dto.environment }),
      ...(dto.temperature !== undefined && { temperature: dto.temperature }),
      ...(dto.temperatureUnit !== undefined && { temperatureUnit: dto.temperatureUnit }),
      ...(dto.Season !== undefined && { Season: dto.Season }),
    };
  }
}
