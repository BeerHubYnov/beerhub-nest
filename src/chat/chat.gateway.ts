import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../auth/ws-auth.guard';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
@UseGuards(WsAuthGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}
    
    private connectedUsers = new Map<string, string>(); // socketId -> userId
    
    async handleConnection(client: Socket) {
        try {
            const authToken = client.handshake.headers.authorization;
            const payload = this.jwtService.verify(authToken, {
                secret: process.env.JWT_SECRET
            });

            if (!payload) {
                throw new WsException('Invalid token');
            }

            const userId = payload.sub
            this.connectedUsers.set(client.id, userId);
            
            // Rejoindre tous les groupes de l'utilisateur
            const userGroups = await this.prisma.groupMember.findMany({
                where: { userId },
                select: { groupId: true },
            });
            
            userGroups.forEach((group) => {
                client.join(`group:${group.groupId}`);
            });
        } catch (error) {
            client.disconnect(true);
            console.error(error);
        }
    }
    
    handleDisconnect(client: Socket) {
        this.connectedUsers.delete(client.id);
    }
    
    @SubscribeMessage('sendPrivateMessage')
    async handlePrivateMessage(client: Socket, payload: { receiverId: string, content: string }) {
        const senderId = this.connectedUsers.get(client.id);
        
        // Créer ou récupérer une conversation existante
        const conversation = await this.prisma.conversation.create({
            data: {
                participants: {
                    connect: [
                        { id: senderId },
                        { id: payload.receiverId }
                    ]
                }
            }
        });
        
        // Sauvegarder le message
        const message = await this.prisma.message.create({
            data: {
                content: payload.content,
                senderId,
                conversationId: conversation.id,
                receiverId: payload.receiverId,
            },
            include: {
                sender: true,
            },
        });

        const receiverSocketId = [...this.connectedUsers.entries()]
            .filter(({ 1: value }) => value === payload.receiverId)
            .map(([k]) => k);

        // Émettre le message au destinataire
        this.server.to(receiverSocketId).emit('privateMessage', message);
    }
    
    @SubscribeMessage('sendGroupMessage')
    async handleGroupMessage(client: Socket, payload: { groupId: number, content: string }) {
        const senderId = this.connectedUsers.get(client.id);
        
        // Vérifier si l'utilisateur est membre du groupe
        const memberShip = await this.prisma.groupMember.findUnique({
            where: {
                userId_groupId: {
                    userId: senderId,
                    groupId: payload.groupId,
                },
            },
        });
        
        if (!memberShip) {
            return;
        }
        
        // Sauvegarder le message
        const message = await this.prisma.message.create({
            data: {
                content: payload.content,
                senderId,
                groupId: payload.groupId,
            },
            include: {
                sender: true,
            },
        });
        
        // Émettre le message à tous les membres du groupe
        this.server.to(`group:${payload.groupId}`).emit('groupMessage', message);
    }
}