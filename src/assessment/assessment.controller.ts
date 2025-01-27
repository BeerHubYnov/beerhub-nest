import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { UUID } from 'crypto';
import { get } from 'http';

@Controller('assessment')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  @Post()
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentService.create(createAssessmentDto);
  }

  @Get()
  findAll() {
    return this.assessmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.assessmentService.findOne(id);
  }

  @Get('user/:id_User')
  findByUser(@Param('id_User') id_User: UUID) {
    return this.assessmentService.findByUser(id_User);
  }

  @Get('bar/:id_Bar')
  findByBar(@Param('id_Bar') id_Bar: UUID) {
    return this.assessmentService.findByBar(id_Bar);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateAssessmentDto: UpdateAssessmentDto) {
    return this.assessmentService.update(id, updateAssessmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.assessmentService.remove(id);
  }
}
