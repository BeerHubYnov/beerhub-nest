import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const { id_User, id_Evevent } = createSubscriptionDto;

    const existing = await this.prisma.subscription.findUnique({
      where: {
        id_Evevent_id_User: { id_Evevent, id_User },
      },
    });

    if (existing) {
      const updated = await this.prisma.subscription.update({
        where: {
          id_Evevent_id_User: {
            id_Evevent: existing.id_Evevent,
            id_User: existing.id_User,
          },
        },
        data: { isSubscribe: !existing.isSubscribe },
      });
      return {
        subscription: updated,
        message: updated.isSubscribe
          ? "Vous êtes désormais inscrit à l'événement."
          : "Vous êtes désormais désinscrit de l'événement.",
      };
    } else {
      const created = await this.prisma.subscription.create({
        data: {
          id_User,
          id_Evevent,
          isSubscribe: true,
        },
      });
      return {
        subscription: created,
        message: "Vous êtes désormais inscrit à l'événement.",
      };
    }
  }

  findAll() {
    return this.prisma.subscription.findMany();
  }

  findOne(id_User: UUID, id_Evevent: UUID) {
    return this.prisma.subscription.findUnique({
      where: { id_Evevent_id_User: { id_Evevent, id_User } },
    });
  }

  update(
    id_User: UUID,
    id_Evevent: UUID,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.prisma.subscription.update({
      where: { id_Evevent_id_User: { id_Evevent, id_User } },
      data: updateSubscriptionDto,
    });
  }

  remove(id_User: UUID, id_Evevent: UUID) {
    return this.prisma.subscription.delete({
      where: { id_Evevent_id_User: { id_Evevent, id_User } },
    });
  }
}
