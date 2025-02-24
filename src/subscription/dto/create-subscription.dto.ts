import { IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty({
    example: '233aad60-87d7-4b8f-b363-db47b6ed942c',
    description: 'id_User',
  })
  @IsUUID()
  id_User: string;
  @ApiProperty({
    example: '68200b1d-a94a-4bdc-8180-c883fa8d5ca3',
    description: 'id_Evevent',
  })
  @IsUUID()
  id_Evevent: string;
  @IsBoolean()
  isSubscribe: boolean;
}
