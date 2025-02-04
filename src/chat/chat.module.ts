import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ChatController } from './chat.controller';

@Module({
    providers: [ChatGateway, PrismaService, JwtService],
    controllers: [ChatController],
})
export class ChatModule {}
