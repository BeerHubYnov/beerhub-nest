import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UUID } from 'crypto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.eventService.findOne(id);
  }

  @Get('bar/:id_Bar')
  findByBar(@Param('id_Bar') id_Bar: UUID) {
    return this.eventService.findByBar(id_Bar);
  }

  @Get('date/upcoming')
  findUpcoming() {
    return this.eventService.findUpcoming();
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.eventService.remove(id);
  }
}
