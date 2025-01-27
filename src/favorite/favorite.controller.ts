import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { UUID } from 'crypto';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.create(createFavoriteDto);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.favoriteService.findOne(id);
  }

  @Get('user/:id_User')
  findByUser(@Param('id_User') id_User: UUID) {
    return this.favoriteService.findByUser(id_User);
  }

  @Get('bar/:id_Bar')
  findByBar(@Param('id_Bar') id_Bar: UUID) {
    return this.favoriteService.findByBar(id_Bar);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoriteService.update(id, updateFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.favoriteService.remove(id);
  }
}
