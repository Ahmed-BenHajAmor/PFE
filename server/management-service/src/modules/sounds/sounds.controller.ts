import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { SoundsService } from './sounds.service';
import { Roles } from '../users/decorators/role.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from '../users/guard/role.guard';
import { CreateSoundDto } from './dtos/create-sound.dto';
import { SoundMapper } from './mappers/sound.mapper';
import { UpdateSoundDto } from './dtos/update-sound.dto';
import { GetSoundsFilterDto } from './dtos/sounds-filter.dto';

@Controller('sounds')
export class SoundsController {
    constructor(private soundService : SoundsService){}

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    createSound(@Body() createSoundDto : CreateSoundDto){
        return this.soundService.createSound(SoundMapper.toCreateSound(createSoundDto));
    } 

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Delete(":soundId")
    @HttpCode(HttpStatus.OK)
    deleteSound(@Param("soundId") soundId : string){
        this.soundService.deleteSound(soundId);
        return {msg : "sound deleted successfully"}
    } 

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Put(":soundId")
    @HttpCode(HttpStatus.OK)
    updateSound(@Param("soundId") soundId : string, @Body() sound : UpdateSoundDto){
        return this.soundService.updateSound(soundId, SoundMapper.toUpdateSound(sound));
        
    } 

    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get()
    @HttpCode(HttpStatus.OK)
    getSounds(@Query() filter : GetSoundsFilterDto){
        return this.soundService.getSounds(filter)
    }

}
