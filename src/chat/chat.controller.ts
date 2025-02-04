import { Body, Controller, Post } from '@nestjs/common';
import { CreateGroupDto } from './dto/createGroupDto';

@Controller('chat')
export class ChatController {
    constructor() {}

    @Post('group')
    newGroupe(@Body() createGroupDto: CreateGroupDto) {
        console.log(createGroupDto)
        return;
    }
}
