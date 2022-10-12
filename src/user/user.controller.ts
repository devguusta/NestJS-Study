import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express';
import { JwtGuard } from 'src/auth/guard';


@UseGuards(JwtGuard)
@Controller('user')
export class UserController {

@Get('me')
  getMe(@Req() req: Request){
  
    
    return req.user;

    }
}
