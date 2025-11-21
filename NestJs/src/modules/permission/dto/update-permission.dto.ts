import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';

/**
 * 更新权限 DTO
 */
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
