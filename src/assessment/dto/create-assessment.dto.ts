import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateAssessmentDto {
  @ApiProperty({ example: 5, description: 'Note attribuée' })
  @IsInt()
  note: number;

  @ApiProperty({ example: 'Super bar', description: 'Commentaire' })
  @IsString()
  @MaxLength(50)
  comment: string;

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
