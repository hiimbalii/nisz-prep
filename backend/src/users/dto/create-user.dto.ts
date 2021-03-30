import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'Kerek Elek' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Alma1234' })
  password: string;
}
