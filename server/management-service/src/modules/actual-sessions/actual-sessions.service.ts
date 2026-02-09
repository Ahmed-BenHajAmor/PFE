import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActualSessionDto } from './dtos/create-actual-session.dto';

@Injectable()
export class ActualSessionsService {
    constructor(private prismaService : PrismaService){}

    async createActualSession(actualSession : CreateActualSessionDto){
        const inputtedSession = await this.prismaService.inputtedSession.findUnique({
            where : {id: actualSession.inputtedSessionId}
        });
        if(!inputtedSession)
            throw new NotFoundException("session is not created !!")

        return this.prismaService.actualSession.create({
            data:{
                startTime: new Date(actualSession.startTime),
                actualEndTime: new Date(actualSession.actualEndTime),
                actualDuration: actualSession.actualDuration,
                inputtedSession: {
                    connect: {
                        id: actualSession.inputtedSessionId,
                    },
                },
            }
        })
    }
}
