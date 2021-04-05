import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  createPermission(@Body(ValidationPipe) createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermissionDto);
  }
}
