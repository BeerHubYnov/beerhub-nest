import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}
  async create(createSubscriptionDto: CreateSubscriptionDto) {
    return this.prisma.subscription.create({
      data: {
        id_User: createSubscriptionDto.id_User,
        id_Evevent: createSubscriptionDto.id_Evevent,
        isSubscribe: createSubscriptionDto.isSubscribe,
      },
    });
  }

  findAll() {
    return this.prisma.subscription.findMany();
  }

  findOne(id: UUID, id_User: UUID, id_Evevent: UUID) {
    return this.prisma.subscription.findUnique({
      where: { id_id_Evevent_id_User: { id, id_Evevent, id_User } },
    });
  }

  update(
    id: UUID,
    id_User: UUID,
    id_Evevent: UUID,
    updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.prisma.subscription.update({
      where: { id_id_Evevent_id_User: { id, id_Evevent, id_User } },
      data: updateSubscriptionDto,
    });
  }

  remove(id: UUID, id_User: UUID, id_Evevent: UUID) {
    return this.prisma.subscription.delete({
      where: { id_id_Evevent_id_User: { id, id_Evevent, id_User } },
    });
  }
}
