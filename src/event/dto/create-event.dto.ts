import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class CreateEventDto {
  @ApiProperty({
    example: '2021-10-10T20:00:00.000Z',
    description: "Date e l'événement",
  })
  @IsDate()
  dateHour: Date;

  @ApiProperty({ example: 'Soirrée KARAOKE', description: 'Titre' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Soirée KARAOKE de folie',
    description: 'Description',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 'KARAOKE', description: 'Catégorie' })
  @IsString()
  category: string;

  @ApiProperty({
    example: '498d1d4c-4557-4a50-9565-626940820091',
    description: "ID de l'utilisateur propriétaire de l'événement",
  })
  @IsUUID()
  id_Bar: UUID;
}
