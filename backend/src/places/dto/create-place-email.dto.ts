import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreatePlaceDto } from './create-place.dto';

export class CreatePlaceEmailDto extends CreatePlaceDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;
}
