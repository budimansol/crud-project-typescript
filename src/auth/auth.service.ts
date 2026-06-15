import { Injectable, BadRequestException, UnauthorizedException, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ){}
    
    async register(dto: RegisterDto){
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });
        
        if (existingUser){
            throw new BadRequestException('Email already registered');
        }
        
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                role: true,
                createdAt: true,
            },
        });
        
        return {
            success: true,
            message: 'Register Success',
            data: user
        }
    }
    
    async login(dto: LoginDto){
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            },
        });
        
        if(!user){
            throw new UnauthorizedException('Invalid Email or Password');
        }
        
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid Email or Password');
        }
        
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };
        
        const accessToken = await this.jwtService.signAsync(payload);
        
        return {
            success: true,
            message: 'Login Success',
            accessToken: accessToken,
            user: {
                id : user.id,
                name : user.name,
                email : user.email,
                role: user.role
            },
        };
    }
    
    async profile(userId: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        });
        
        return {
            success: true,
            message: 'Profile retrive success',
            data: user
        }
    }
    
}
