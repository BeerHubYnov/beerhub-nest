import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SendFriendRequestDto } from './dto/send-friend-request.dto';
import { AcceptFriendRequestDto } from './dto/accept-friend-request.dto';
import { ApiBody } from '@nestjs/swagger';
import { UUID } from 'crypto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.userService.remove(id);
  }

  @Post('send-friend-request')
  sendFriendRequest(@Body() sendFriendRequestDto: SendFriendRequestDto) {
    return this.userService.sendFriendRequest(
      sendFriendRequestDto.userId,
      sendFriendRequestDto.friendId,
    );
  }

  @Post('accept-friend-request')
  acceptFriendRequest(@Body() acceptFriendRequestDto: AcceptFriendRequestDto) {
    return this.userService.acceptFriendRequest(
      acceptFriendRequestDto.userId,
      acceptFriendRequestDto.friendId,
    );
  }

  @Get(':id/friends')
  getFriends(@Param('id') id: string) {
    return this.userService.getFriends(id);
  }

  @Get(':id/friend-requests')
  getFriendRequests(@Param('id') id: string) {
    return this.userService.getFriendRequests(id);
  }

  @Delete(':id/friend-request/:friendid')
  removeFriendRequest(
    @Param('id') id: string,
    @Param('friendid') friendid: string,
  ) {
    return this.userService.removeFriendRequest(id, friendid);
  }

  @Delete(':id/friend/:friendid')
  removeFriend(@Param('id') id: string, @Param('friendid') friendid: string) {
    return this.userService.removeFriend(id, friendid);
  }
}
