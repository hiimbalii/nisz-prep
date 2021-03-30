import { IsNotEmpty } from 'class-validator';

export class CreatePlaceDto {
  @IsNotEmpty()
  lng: number;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  placeName: string;
}
