import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    return this.prisma.user.create({
      data: {
        id: uuidv4(),
        ...createUserDto,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        Role: true,
      },
    });
  }

  findOne(id: UUID) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        Role: true,
      },
    });
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        Role: true,
      },
    });
  }

  remove(id: UUID) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        Role: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
      include: {
        Role: true,
      },
    });
  }

  async sendFriendRequest(userId: string, friendId: string) {
    return this.prisma.friendship.create({
      data: {
        userId,
        friendId,
      },
    });
  }

  async acceptFriendRequest(userId: string, friendId: string) {
    return this.prisma.friendship.updateMany({
      where: {
        userId: friendId,
        friendId: userId,
        status: 'PENDING',
      },
      data: {
        status: 'ACCEPTED',
      },
    });
  }

  async getFriends(userId: string) {
    return this.prisma.friendship.findMany({
      where: {
        OR: [
          { userId, status: 'ACCEPTED' },
          { friendId: userId, status: 'ACCEPTED' },
        ],
      },
      include: {
        User: true,
        Friend: true,
      },
    });
  }

  async getFriendRequests(userId: string) {
    return this.prisma.friendship.findMany({
      where: {
        friendId: userId,
        status: 'PENDING',
      },
      include: {
        User: true,
        Friend: true,
      },
    });
  }

  async removeFriend(userId: string, friendId: string) {
    return this.prisma.friendship.deleteMany({
      where: {
        OR: [
          { userId, status: 'ACCEPTED' },
          { friendId: userId, status: 'ACCEPTED' },
          { userId: friendId, status: 'ACCEPTED' },
          { friendId: friendId, status: 'ACCEPTED' },
        ],
      },
    });
  }

  async removeFriendRequest(userId: string, friendId: string) {
    return this.prisma.friendship.deleteMany({
      where: {
        userId: friendId,
        friendId: userId,
        status: 'PENDING',
      },
    });
  }
}
