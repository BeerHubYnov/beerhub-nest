import { Injectable } from '@nestjs/common';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UUID } from 'crypto';

@Injectable()
export class AssessmentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAssessmentDto: CreateAssessmentDto) {
    return this.prisma.assessment.create({
      data: createAssessmentDto,
    });
  }

  findAll() {
    return this.prisma.assessment.findMany({
      include: { User: true, Bar: true },
    });
  }

  findOne(id: UUID) {
    return this.prisma.assessment.findUnique({
      where: { id },
      include: { User: true, Bar: true },
    });
  }

  update(id: UUID, updateAssessmentDto: UpdateAssessmentDto) {
    return this.prisma.assessment.update({
      where: { id },
      data: updateAssessmentDto,
    });
  }

  remove(id: UUID) {
    return this.prisma.assessment.delete({
      where: { id },
    });
  }

  findByUser(id_User: UUID) {
    return this.prisma.assessment.findMany({
      where: { id_User },
      include: { User: true, Bar: true },
    });
  }

  findByBar(id_Bar: UUID) {
    return this.prisma.assessment.findMany({
      where: { id_Bar },
      include: { User: true, Bar: true },
    });
  }
}
