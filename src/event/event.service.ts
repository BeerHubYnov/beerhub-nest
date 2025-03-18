import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UUID } from 'crypto';

@Injectable()
export class EventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: createEventDto,
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      include: { Bar: true },
    });
  }

  async findOne(id: UUID) {
    return this.prisma.event.findUnique({
      where: { id },
      include: { Bar: true },
    });
  }

  async update(id: UUID, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: UUID) {
    return this.prisma.event.delete({
      where: { id },
    });
  }

  async findByBar(id_Bar: UUID) {
    return this.prisma.event.findMany({
      where: { id_Bar },
      include: { Bar: true },
    });
  }

  async findUpcoming() {
    const today = new Date();
    return this.prisma.event.findMany({
      where: {
        dateHour: {
          gte: today,
        },
      },
      include: { Bar: true },
    });
  }

  async findManyByCategory(category: string) {
    return this.prisma.event.findMany({
      where: { category },
      include: { Bar: true },
    });
  }
}
