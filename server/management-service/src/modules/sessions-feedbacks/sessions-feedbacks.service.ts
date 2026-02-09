import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionFeedbackDto } from './dtos/create-session-feedback.dto';
import { SessionFeedbackFilterDto } from './dtos/session-feedback-filter.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class SessionsFeedbacksService {
    constructor(private prismaService : PrismaService) {}

    async createSessionFeedback(sessionId: string, createSessionFeedbackDto: CreateSessionFeedbackDto) {
        const session = await this.prismaService.inputtedSession.findUnique({
            where: {
                id: sessionId
            }
        }) 
        if(!session)
            throw new NotFoundException('Session not found');
        return this.prismaService.sessionFeedback.create({
            data: {
                feeling: createSessionFeedbackDto.feeling,
                description: createSessionFeedbackDto.description,
                session: {
                    connect: { id: sessionId },
                },
            }
        })
    }

    async getSessionsFeedbacks(filter: SessionFeedbackFilterDto) {
    const {
      sessionId,
      feeling,
      description,
      createdAtMin,
      createdAtMax,
      page = 1,
      limit = 10,
    } = filter;

    const where: Prisma.SessionFeedbackWhereInput = {
      ...(sessionId && { sessionId }),
      ...(feeling && { feeling: { contains: feeling, mode: 'insensitive' } }),
      ...(description && { description: { contains: description, mode: 'insensitive' } }),
      ...((createdAtMin || createdAtMax) && {
        createdAt: {
          ...(createdAtMin && { gte: new Date(createdAtMin) }),
          ...(createdAtMax && { lte: new Date(createdAtMax) }),
        },
      }),
    };

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prismaService.sessionFeedback.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { session: true }, // optional: include session details
      }),
      this.prismaService.sessionFeedback.count({ where }),
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
