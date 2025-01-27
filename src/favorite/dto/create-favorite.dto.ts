import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({
    example: '498d1d4c-4557-4a50-9565-626940820091',
    description: "ID de l'utilisateur",
  })
  @IsUUID()
  id_User: string;

  @ApiProperty({
    example: '498d1d4c-4557-4a50-9565-626940820091',
    description: 'ID du bar',
  })
  @IsUUID()
  id_Bar: string;
}
