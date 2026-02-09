import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetSoundsFilterDto } from '../users/dtos/sounds-filter.dto';

@Injectable()
export class SoundsService {
  constructor(private prismaService: PrismaService) {}

  async createSound(sound: Prisma.SoundCreateInput) {
    const soundIfExists = await this.prismaService.sound.findUnique({
      where: { url: sound.url },
    });

    if (soundIfExists) {
      throw new BadRequestException('Sound already exists');
    }

    return this.prismaService.sound.create({
      data: sound,
    });
  }

  async deleteSound(soundId: string) {
    const soundToDelete = await this.prismaService.sound.findUnique({
      where: { id: soundId },
    });

    if (!soundToDelete) {
      throw new NotFoundException('Sound does not exist');
    }

    await this.prismaService.sound.delete({
      where: { id: soundId },
    });
  }

  async updateSound(soundId: string, sound: Prisma.SoundUpdateInput) {
    const soundToUpdate = await this.prismaService.sound.findUnique({
      where: { id: soundId },
    });

    if (!soundToUpdate) {
      throw new NotFoundException('Sound does not exist');
    }

    return this.prismaService.sound.update({
      where: { id: soundId },
      data: sound,
    });
  }

  async getSounds(filter: GetSoundsFilterDto) {
    const {
      search,
      status,
      minDuration,
      maxDuration,
      createdAtMin,
      createdAtMax,
      page = 1,
      limit = 10,
    } = filter;

    const where: Prisma.SoundWhereInput = {
      ...(status && { status }),

      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),

      ...((minDuration || maxDuration) && {
        totalDuration: {
          ...(minDuration && { gte: minDuration }),
          ...(maxDuration && { lte: maxDuration }),
        },
      }),

      ...((createdAtMin || createdAtMax) && {
        createdAt: {
          ...(createdAtMin && { gte: createdAtMin }),
          ...(createdAtMax && { lte: createdAtMax }),
        },
      }),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prismaService.sound.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prismaService.sound.count({ where }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
