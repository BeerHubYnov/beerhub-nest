import { Module } from '@nestjs/common';
import { BarService } from './bar.service';
import { BarController } from './bar.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [BarController],
  providers: [BarService, PrismaService],
})
export class BarModule {}
