import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Example@example.com', description: 'Adresse email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Mot de passe' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'username', description: "Nom d'utilisateur" })
  @IsString()
  username: string;

  @ApiProperty({
    example: '384cfa01-6183-44f2-862b-e165ad99b51e',
    description: 'ID du rôle',
  })
  @IsUUID()
  id_Role: string;
}
