import { BadRequestException, ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { argon2d } from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class  AuthService{
    constructor(private prisma: PrismaService){}

  
 async signup(dto: AuthDto){

    try {

        const oldUser = await this.prisma.user.findFirst(
            {
                where: {
                    email: dto.email
                }
            }
        );
        console.log(oldUser);
        if(oldUser){
            throw new BadRequestException({
                message: "User already exists",
                statusCode: 400,
            })
        }


        const hash = await argon.hash(dto.password);  


        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
            
        });
        
        delete user.hash;
        return user;
    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError){
            if(error.code === "P2002"){
                throw new ForbiddenException('Credentials taken');
            }
        }
        throw error;
    }
   
    }

  async  signin(dto: AuthDto){

    const user = await this.prisma.user.findUnique(
        {
            where: {
                email: dto.email
            }
        }
    );
    if(!user){
        throw new ForbiddenException('Credentials incorrect');
    }
    const pwMatches = await argon.verify(user.hash, dto.password);
    if(!pwMatches){
        throw new ForbiddenException('Credentials incorrect');
    }

    delete user.hash;

        return user;
  }
}