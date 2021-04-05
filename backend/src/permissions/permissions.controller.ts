import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Permission')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Jogosultság létrehozása' })
  @ApiResponse({ status: 200, description: 'Sikeres művelet' })
  @ApiResponse({ status: 400, description: 'Hibásan megadott adatok' })
  @ApiResponse({ status: 409, description: 'Már létezik ilyen kódú jogosutság' })
  @ApiResponse({ status: 500, description: 'Szerverhiba' })
  createPermission(@Body(ValidationPipe) createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermissionDto);
  }
}
