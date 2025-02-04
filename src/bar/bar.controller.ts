import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BarService } from './bar.service';
import { CreateBarDto } from './dto/create-bar.dto';
import { UpdateBarDto } from './dto/update-bar.dto';
import { UUID } from 'crypto';
import { ApiBody } from '@nestjs/swagger';

@Controller('bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Post()
  @ApiBody({ type: CreateBarDto })
  create(@Body() createBarDto: CreateBarDto) {
    return this.barService.create(createBarDto);
  }

  @Get()
  findAll() {
    return this.barService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.barService.findOne(id);
  }

  @Get('name/:name')
  findOneByName(@Param('name') name: string) {
    return this.barService.findOneByName(name);
  }

  @Get('name/:name/many')
  findManyByName(@Param('name') name: string) {
    return this.barService.findManyByName(name);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateBarDto })
  update(@Param('id') id: UUID, @Body() updateBarDto: UpdateBarDto) {
    return this.barService.update(id, updateBarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.barService.remove(id);
  }

  @Get('user/:id_User')
  findByUser(@Param('id_User') id_User: UUID) {
    return this.barService.findByUser(id_User);
  }
}
