import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { SessionsFeedbacksService } from './sessions-feedbacks.service';
import { JwtAuthGuard } from '../users/guard/auth.guard';
import { CreateSessionFeedbackDto } from './dtos/create-session-feedback.dto';
import { SessionFeedbackFilterDto } from './dtos/session-feedback-filter.dto';

@Controller('sessions-feedbacks')
export class SessionsFeedbacksController {
    constructor(private sessionsFeedbackService : SessionsFeedbacksService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    createSessionFeedback(@Body() createSessionFeedbackDto: CreateSessionFeedbackDto) {
        return this.sessionsFeedbackService.createSessionFeedback(createSessionFeedbackDto.sessionId, createSessionFeedbackDto);
    }

    @Get()
    @HttpCode(HttpStatus.CREATED)
    getSessionsFeedbacks(@Query() filter: SessionFeedbackFilterDto) {
        return this.sessionsFeedbackService.getSessionsFeedbacks(filter);
    }
}
