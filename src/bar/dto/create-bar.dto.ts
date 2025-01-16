import { ApiProperty } from '@nestjs/swagger';

export class CreateBarDto {
  @ApiProperty({ example: 'Le Bar des Amis', description: 'Nom du bar' })
  name: string;

  @ApiProperty({
    example: 'Un bar convivial avec une ambiance chaleureuse',
    description: 'Description du bar',
  })
  description: string;

  @ApiProperty({
    example: '18:00 - 20:00',
    description: "Heure de l'happy hour",
  })
  happyHoure: string;

  @ApiProperty({
    example: 48.8566,
    description: 'Coordonnée X de la localisation du bar',
  })
  localisationX: number;

  @ApiProperty({
    example: 2.3522,
    description: 'Coordonnée Y de la localisation du bar',
  })
  localisationY: number;

  @ApiProperty({
    example: '4f79202c-1efb-4716-910e-3eb2b2a065a6',
    description: "ID de l'utilisateur propriétaire du bar",
  })
  id_User: string;
}
