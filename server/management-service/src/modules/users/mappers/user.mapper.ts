import { Prisma, User } from "@prisma/client";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UserResponseDto } from "../dtos/user-response.dto";

export class UserMapper{
    static toUserCreateInput(registerUserDto : CreateUserDto) : Prisma.UserCreateInput{
        return  {
           ... registerUserDto
        }
    }

    static toUserResponseDto(user : User) : UserResponseDto{
        const {password, ...rest} = user;
        return  {
            ...rest
        }
    }

    

}