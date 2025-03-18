import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBarDto } from './dto/create-bar.dto';
import { UpdateBarDto } from './dto/update-bar.dto';
import { UUID } from 'crypto';

@Injectable()
export class BarService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBarDto: CreateBarDto) {
    return this.prisma.bar.create({
      data: createBarDto,
    });
  }

  async findAll() {
    return this.prisma.bar.findMany({
      include: { User: true },
    });
  }

  async findOne(id: UUID) {
    return this.prisma.bar.findUnique({
      where: { id },
      include: { User: true },
    });
  }

  async findOneByName(name: string) {
    return this.prisma.bar.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: { User: true },
    });
  }

  async findManyByName(name: string) {
    return this.prisma.bar.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: { User: true },
    });
  }

  async update(id: UUID, updateBarDto: UpdateBarDto) {
    return this.prisma.bar.update({
      where: { id },
      data: updateBarDto,
    });
  }

  async remove(id: UUID) {
    return this.prisma.bar.delete({
      where: { id },
    });
  }

  async findByUser(id_User: UUID) {
    return this.prisma.bar.findMany({
      where: { id_User },
      include: { User: true },
    });
  }
}
