import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  @ApiProperty({ example: 60 })
  lng: number;

  @IsNotEmpty()
  @ApiProperty({ example: 49 })
  lat: number;

  // @IsNotEmpty()
  // @ApiProperty({ example: 'Budapest' })
  // placeName: string;
}
