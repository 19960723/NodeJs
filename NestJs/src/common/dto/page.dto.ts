import { IsInt, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * 分页查询基础 DTO
 * 所有需要分页的查询接口都可以继承此类
 */
export class PageDto {
  @ApiPropertyOptional({ description: '页码', example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '页码必须是整数' })
  @Min(1, { message: '页码最小为 1' })
  page?: number = 1;

  @ApiPropertyOptional({
    description: '每页数量',
    example: 10,
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: '每页数量必须是整数' })
  @Min(1, { message: '每页数量最小为 1' })
  @Max(100, { message: '每页数量最大为 100' })
  pageSize?: number = 10;

  /**
   * 获取跳过的记录数（用于 Prisma skip）
   */
  getSkip(): number {
    return ((this.page ?? 1) - 1) * (this.pageSize ?? 10);
  }

  /**
   * 获取每页数量（用于 Prisma take）
   */
  getTake(): number {
    return this.pageSize ?? 10;
  }
}
