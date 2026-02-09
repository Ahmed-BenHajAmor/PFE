import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserMapper } from './mappers/user.mapper';
import { loginDto } from './dtos/login.dto';
import { User } from './decorators/user.decorator';
import { JwtAuthGuard } from './guard/auth.guard';
import { GetUsersFilterDto } from './dtos/user-filter.dto';
import { RolesGuard } from './guard/role.guard';
import { Roles } from './decorators/role.decorator';
import { Role } from '@prisma/client';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
     register(@Body() user : CreateUserDto){
        this.usersService.register(UserMapper.toUserCreateInput(user));
        return {
            message: 'User registered successfully',
        };
    }

    @Post("login")
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto : loginDto){
        return this.usersService.login(loginDto.email, loginDto.password);

    }

 

    @Put()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.CREATED)
    updateUser(@User("userId") userId : string, @Body() user : CreateUserDto) {
        return this.usersService.updateUser(userId, user);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    deleteUser(@User("userId") userId : string){
        this.usersService.deleteUser(userId);
    }

    @Get("profile")
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    async getProfile(@User("userId") userId : string) : Promise<UserResponseDto>{
        const user = await this.usersService.getProfile(userId);
        return UserMapper.toUserResponseDto(user);
    }

    @Get("filter")
    @Roles(Role.ADMIN)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @HttpCode(HttpStatus.OK)
    async getUsers(@Query() usersFilter : GetUsersFilterDto){
        const users =await  this.usersService.getUsers(usersFilter);
        return {
            data : users.data.map(user => UserMapper.toUserResponseDto(user)),
            metadata : users.meta
        }
    }
}
