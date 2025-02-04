import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [ChatGateway, PrismaService, JwtService],
})
export class ChatModule {}
