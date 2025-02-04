import { IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 'id_User',
    description: 'id_Evevent',
  })
  @IsUUID()
  id_User: string;
  @IsUUID()
  id_Evevent: string;
  @IsBoolean()
  isSubscribe: boolean;
}
