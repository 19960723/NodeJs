import { ApiProperty } from '@nestjs/swagger';

/**
 * 字典返回 VO
 */
export class DictVo {
  @ApiProperty({ description: '字典 ID' })
  id: number;

  @ApiProperty({ description: '字典名称' })
  name: string;

  @ApiProperty({ description: '字典编码' })
  code: string;
}

/**
 * 字典项返回 VO
 */
export class DictItemVo {
  @ApiProperty({ description: '字典项 ID' })
  id: number;

  @ApiProperty({ description: '字典项名称' })
  label: string;

  @ApiProperty({ description: '字典项值' })
  value: string;

  @ApiProperty({ description: '字典项排序' })
  sort: number;

  @ApiProperty({ description: '字典项描述' })
  description?: string;

  @ApiProperty({ description: '字典 ID' })
  dictId: number;
}
