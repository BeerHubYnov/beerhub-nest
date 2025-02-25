import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendFriendRequestDto {
  @ApiProperty({
    example: '384cfa01-6183-44f2-862b-e165ad99b51e',
    description: 'ID User',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    example: '384cfa01-6183-44f2-862b-e165ad99b51e',
    description: 'ID friend',
  })
  @IsString()
  friendId: string;
}
