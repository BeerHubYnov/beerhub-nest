import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UUID } from 'crypto';
import { PrismaService } from '../../prisma/prisma.service';


@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) { }

  create(createFavoriteDto: CreateFavoriteDto) {
    return this.prisma.favorite.create({
      data: createFavoriteDto,
    });
  }

  findAll() {
    return this.prisma.favorite.findMany(
      {
        include: {
          User: true,
          Bar: true
        }
      }
    );
  }

  findOne(id: UUID) {
    return this.prisma.favorite.findUnique({
      where: { id },
      include: {
        User: true,
        Bar: true
      }
    });
  }

  update(id: UUID, updateFavoriteDto: UpdateFavoriteDto) {
    return this.prisma.favorite.update({
      where: { id },
      data: updateFavoriteDto
    });
  }

  remove(id: UUID) {
    return this.prisma.favorite.delete({
      where: { id }
    });
  }

  findByUser(id_User: UUID) {
    return this.prisma.favorite.findMany({
      where: { id_User },
      include: {
        User: true,
        Bar: true
      }
    });
  }

  findByBar(id_Bar: UUID) {
    return this.prisma.favorite.findMany({
      where: { id_Bar },
      include: {
        User: true,
        Bar: true
      }
    });
  }
}
