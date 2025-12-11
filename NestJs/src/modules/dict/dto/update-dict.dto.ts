import { PartialType } from '@nestjs/swagger';
import { CreateDictDto, CreateDictItemDto } from './create-dict.dto';

/**
 * 更新字典 DTO
 */
export class UpdateDictDto extends PartialType(CreateDictDto) {}

/**
 * 更新字典项 DTO
 */
export class UpdateDictItemDto extends PartialType(CreateDictItemDto) {}
