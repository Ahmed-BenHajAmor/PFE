import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { InputedSessionsService } from './inputed-sessions.service';
import { InputtedSessionMapper } from './mappers/CreateInputtedSession.mapper';
import { CreateInputtedSessionDto } from './dtos/CreateInputtedSessionDto';
import axios from 'axios';
import { User } from '../users/decorators/user.decorator';
import { GetInputtedSessionsFilterDto } from './dtos/getInputtedSessionsFilter.dto';
import { log } from 'console';
import qs from 'qs';
import { Roles } from '../users/decorators/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../users/guard/role.guard';

@Controller('inputted-sessions')
export class InputedSessionsController {
  constructor(
    private inputedSessionService: InputedSessionsService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createInputedSession(
    @User('userId') userId: string,
    @Body() createInputtedSessionDto: CreateInputtedSessionDto
  ) {

    const response = await axios.get('http://localhost:8000/sounds', {
      params: {
        time_of_day: createInputtedSessionDto.timeOfDay,
        mood: createInputtedSessionDto.mood,
        activity: createInputtedSessionDto.activity,
        environment: createInputtedSessionDto.environment,
        temperature: createInputtedSessionDto.temperature,
        season: createInputtedSessionDto.season,
        prompt: createInputtedSessionDto.prompt,
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    });
    log({
        time_of_day: createInputtedSessionDto.timeOfDay,
        mood: createInputtedSessionDto.mood,
        activity: createInputtedSessionDto.activity,
        environment: createInputtedSessionDto.environment,
        temperature: createInputtedSessionDto.temperature,
        season: createInputtedSessionDto.season,
        prompt: createInputtedSessionDto.prompt,
      })
    const soundIds: string[] = response.data;
    return this.inputedSessionService.createInputtedSession(
      InputtedSessionMapper.toPrismaCreate(
        createInputtedSessionDto,
        soundIds,
        userId
      )
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  getInputtedSessions(@Query() filter: GetInputtedSessionsFilterDto) {
    
    return this.inputedSessionService.getInputtedSessions(filter);
  }

}
