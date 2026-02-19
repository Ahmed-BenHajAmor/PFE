import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { Prisma } from '@prisma/client';
import { GetUsersFilterDto } from './dtos/user-filter.dto';

@Injectable()
export class UsersService {
    constructor(private prismaService : PrismaService){}

    async register(user: Prisma.UserCreateInput ){
        const existingUser = await this.prismaService.user.findUnique({where: {email: user.email}})
        if(existingUser){
            throw new BadRequestException("User cannot be created!!")
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await this.prismaService.user.create({
            data: {...user, password: hashedPassword}
        })
    }
    

    async updateUser(id:string, updatedUser : Prisma.UserUpdateInput) {
        const user = await this.prismaService.user.findUnique({
            where : {id}
        });
        if(!user){
            throw new BadRequestException("Invalid operation")
        }
        return this.prismaService.user.update({
            where: { id },
            data: updatedUser,
        }); 
    }

    async deleteUser(userId : string){
        const user = await this.prismaService.user.findUnique({
            where : {id : userId}
        })
        if(!user){
            throw new BadRequestException("Invalid operation")
        }
        await this.prismaService.user.delete({where : {id: userId}});
    }

    async getUsers(usersFilter: GetUsersFilterDto) {
        const {
            name,
            email,
            role,
            createdAtMin,
            createdAtMax,
            page = 1,
            limit = 10,
        } = usersFilter;

        const where: Prisma.UserWhereInput = {
            ...(name && { name: { contains: name, mode: 'insensitive' } }),
            ...(email && { email: { contains: email, mode: 'insensitive' } }),
            ...(role && { role }),
            ...((createdAtMin || createdAtMax) && {
            createdAt: {
                ...(createdAtMin && { gte: new Date(createdAtMin) }),
                ...(createdAtMax && { lte: new Date(createdAtMax) }),
            },
            }),
        };

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.prismaService.user.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            }),
            this.prismaService.user.count({ where }),
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

        async getProfile(userId : string){
            const user = await this.prismaService.user.findUnique({
                where : {id : userId},
            })
            if(!user){
                throw new NotFoundException("user not found")
            }
            return user;
        }        

}
