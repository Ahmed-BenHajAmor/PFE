import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ActualSessionsService } from './actual-sessions.service';
import { CreateActualSessionDto } from './dtos/create-actual-session.dto';

@Controller('actual-sessions')
export class ActualSessionsController {
    constructor(private actualSessionService : ActualSessionsService)  {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createActualSession(@Body() createActualSessionDto : CreateActualSessionDto) {
        return this.actualSessionService.createActualSession(createActualSessionDto);
    }
}
