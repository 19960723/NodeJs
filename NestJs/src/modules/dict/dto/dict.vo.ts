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
