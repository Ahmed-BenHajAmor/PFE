import { Injectable } from '@nestjs/common';
import { Prisma, Season, SoundActivity, SoundEnvironment, SoundMood } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetInputtedSessionsFilterDto } from './dtos/getInputtedSessionsFilter.dto';

@Injectable()
export class InputedSessionsService {
    constructor(private prismaService : PrismaService) {}

    async createInputtedSession(inputtedSession : Prisma.InputtedSessionCreateInput) {
    return await this.prismaService.inputtedSession.create({
            data : {
        ...inputtedSession,

      }
    });
  }


  async getInputtedSessions(filter: GetInputtedSessionsFilterDto) {
    const {
      search,
      timeOfDay,
      mood,
      activity,
      environment,
      season,
      minDuration,
      maxDuration,
      createdAtMin,
      createdAtMax,
      userId,
      page = 1,
      limit = 10,
    } = filter;

    const where: Prisma.InputtedSessionWhereInput = {
      ...(userId && { userId }),

      ...(timeOfDay && {
        timeOfDay: { contains: timeOfDay, mode: 'insensitive' },
      }),

      ...(search && {
        OR: [{ prompt: { contains: search, mode: 'insensitive' } }],
      }),

      ...((minDuration || maxDuration) && {
        chosenDuration: {
          ...(minDuration && { gte: minDuration }),
          ...(maxDuration && { lte: maxDuration }),
        },
      }),

      ...((createdAtMin || createdAtMax) && {
        date: {
          ...(createdAtMin && { gte: new Date(createdAtMin) }),
          ...(createdAtMax && { lte: new Date(createdAtMax) }),
        },
      }),

      ...(mood && {
        mood: {
          hasEvery: mood.map(m =>
            SoundMood[m as keyof typeof SoundMood],
          ),
        },
      }),

      ...(activity && {
        activity: {
          hasEvery: activity.map(a =>
            SoundActivity[a as keyof typeof SoundActivity],
          ),
        },
      }),

      ...(environment && {
        environment: {
          hasEvery: environment.map(e =>
            SoundEnvironment[e as keyof typeof SoundEnvironment],
          ),
        },
      }),

      ...(season && {
        season: {
          hasEvery: season.map(s =>
            Season[s as keyof typeof Season],
          ),
        },
      }),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prismaService.inputtedSession.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date: 'desc' },
        include: {
          sessionSounds: true,
          actualSession: true,
          sessionFeedback: true,
        },
      }),
      this.prismaService.inputtedSession.count({ where }),
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
