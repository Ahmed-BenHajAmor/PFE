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
      numberOfDownloads: 0,
    };
  }

  static toUpdateSound(dto: UpdateSoundDto): Prisma.SoundUpdateInput {
    return {
      ...(dto.title && { title: dto.title }),
      ...(dto.description && { description: dto.description }),
      ...(dto.totalDuration && { totalDuration: dto.totalDuration }),
      ...(dto.status && { status: dto.status }),
      ...(dto.url && { url: dto.url }),
    };
  }

}
