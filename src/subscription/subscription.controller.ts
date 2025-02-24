import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { UUID } from 'crypto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id_User/:id_Event')
  findOne(@Param('id_User') id_User: UUID, @Param('id_Event') id_Event: UUID) {
    return this.subscriptionService.findOne(id_User, id_Event);
  }

  @Patch(':id_User/:id_Event')
  update(
    @Param('id_User') id_User: UUID,
    @Param('id_Event') id_Event: UUID,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(
      id_User,
      id_Event,
      updateSubscriptionDto,
    );
  }

  @Delete(':id_User/:id_Event')
  remove(@Param('id_User') id_User: UUID, @Param('id_Event') id_Event: UUID) {
    return this.subscriptionService.remove(id_User, id_Event);
  }
}
