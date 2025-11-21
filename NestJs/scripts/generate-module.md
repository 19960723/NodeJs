# 模块生成指南

## 🚀 快速生成新模块

本项目提供标准的模块生成指南，帮助您快速创建符合项目规范的新模块。

## 📝 生成步骤

### 1. 使用 NestJS CLI 生成基础文件

```bash
# 替换 your-module 为你的模块名（使用 kebab-case）
nest g module modules/your-module
nest g controller modules/your-module
nest g service modules/your-module
```

### 2. 创建目录结构

```bash
# 在 src/modules/your-module 下创建以下目录
mkdir src/modules/your-module/dto
mkdir src/modules/your-module/repositories
```

### 3. 创建 DTO 文件

创建以下文件：

- `dto/create-your-module.dto.ts` - 创建 DTO
- `dto/update-your-module.dto.ts` - 更新 DTO
- `dto/query-your-module.dto.ts` - 查询 DTO
- `dto/your-module.vo.ts` - 返回 VO

### 4. 创建 Repository 文件

- `repositories/your-module.repository.ts` - 数据访问层

### 5. 更新 Prisma Schema

在 `prisma/schema.prisma` 中添加数据模型：

```prisma
model YourModule {
  id        Int      @id @default(autoincrement())
  name      String   @db.VarChar(100)
  // ... 其他字段
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("your_modules")
}
```

### 6. 生成 Prisma Client

```bash
npx prisma generate
npx prisma db push  # 或使用 migrate dev
```

### 7. 在 AppModule 中注册

在 `src/app.module.ts` 的 imports 中添加新模块：

```typescript
import { YourModuleModule } from './modules/your-module/your-module.module';

@Module({
  imports: [
    // ... 其他模块
    YourModuleModule,
  ],
})
```

## 📋 文件模板

### DTO 模板

#### create-your-module.dto.ts

```typescript
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateYourModuleDto {
  @ApiProperty({ description: '名称', example: '示例名称' })
  @IsString({ message: '名称必须是字符串' })
  @MinLength(2, { message: '名称最少 2 个字符' })
  @MaxLength(100, { message: '名称最多 100 个字符' })
  name: string;

  @ApiPropertyOptional({ description: '描述' })
  @IsOptional()
  @IsString({ message: '描述必须是字符串' })
  description?: string;
}
```

#### update-your-module.dto.ts

```typescript
import { PartialType } from '@nestjs/swagger';
import { CreateYourModuleDto } from './create-your-module.dto';

export class UpdateYourModuleDto extends PartialType(CreateYourModuleDto) {}
```

#### query-your-module.dto.ts

```typescript
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '../../../common/dto/page.dto';

export class QueryYourModuleDto extends PageDto {
  @ApiPropertyOptional({ description: '名称（模糊搜索）' })
  @IsOptional()
  @IsString()
  name?: string;
}
```

#### your-module.vo.ts

```typescript
import { ApiProperty } from '@nestjs/swagger';

export class YourModuleVo {
  @ApiProperty({ description: 'ID' })
  id: number;

  @ApiProperty({ description: '名称' })
  name: string;

  @ApiProperty({ description: '描述', required: false })
  description?: string;

  @ApiProperty({ description: '创建时间' })
  createdAt: Date;

  @ApiProperty({ description: '更新时间' })
  updatedAt: Date;
}
```

### Repository 模板

```typescript
import { Injectable } from '@nestjs/common';
import { YourModule, Prisma } from '@prisma/client';
import { PrismaService } from '../../../common/repositories/prisma.service';
import { BaseRepository } from '../../../common/repositories/base.repository';

@Injectable()
export class YourModuleRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async create(data: Prisma.YourModuleCreateInput): Promise<YourModule> {
    return this.prisma.yourModule.create({ data });
  }

  async findById(id: number): Promise<YourModule | null> {
    return this.prisma.yourModule.findUnique({ where: { id } });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.YourModuleWhereInput;
    orderBy?: Prisma.YourModuleOrderByWithRelationInput;
  }): Promise<YourModule[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.yourModule.findMany({ skip, take, where, orderBy });
  }

  async count(where?: Prisma.YourModuleWhereInput): Promise<number> {
    return this.prisma.yourModule.count({ where });
  }

  async update(
    id: number,
    data: Prisma.YourModuleUpdateInput,
  ): Promise<YourModule> {
    return this.prisma.yourModule.update({ where: { id }, data });
  }

  async delete(id: number): Promise<YourModule> {
    return this.prisma.yourModule.delete({ where: { id } });
  }
}
```

### Service 模板

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { YourModuleRepository } from './repositories/your-module.repository';
import { CreateYourModuleDto } from './dto/create-your-module.dto';
import { UpdateYourModuleDto } from './dto/update-your-module.dto';
import { QueryYourModuleDto } from './dto/query-your-module.dto';
import { YourModuleVo } from './dto/your-module.vo';
import { BusinessError } from '../../common/exceptions/business.exception';

@Injectable()
export class YourModuleService {
  private readonly logger = new Logger(YourModuleService.name);

  constructor(private readonly yourModuleRepository: YourModuleRepository) {}

  async create(createDto: CreateYourModuleDto): Promise<YourModuleVo> {
    // 业务逻辑验证
    // ...

    const item = await this.yourModuleRepository.create(createDto);
    this.logger.log(`创建成功: ${item.name}`);
    return item as YourModuleVo;
  }

  async findById(id: number): Promise<YourModuleVo> {
    const item = await this.yourModuleRepository.findById(id);
    if (!item) {
      BusinessError.notFound('数据不存在');
    }
    return item as YourModuleVo;
  }

  async findAll(queryDto: QueryYourModuleDto) {
    const { name, page, pageSize } = queryDto;

    const where: any = {};
    if (name) {
      where.name = { contains: name };
    }

    const [items, total] = await Promise.all([
      this.yourModuleRepository.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      }),
      this.yourModuleRepository.count(where),
    ]);

    return {
      list: items.map((item) => item as YourModuleVo),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async update(
    id: number,
    updateDto: UpdateYourModuleDto,
  ): Promise<YourModuleVo> {
    const item = await this.yourModuleRepository.findById(id);
    if (!item) {
      BusinessError.notFound('数据不存在');
    }

    const updated = await this.yourModuleRepository.update(id, updateDto);
    this.logger.log(`更新成功: ${updated.name}`);
    return updated as YourModuleVo;
  }

  async remove(id: number): Promise<void> {
    const item = await this.yourModuleRepository.findById(id);
    if (!item) {
      BusinessError.notFound('数据不存在');
    }

    await this.yourModuleRepository.delete(id);
    this.logger.log(`删除成功: ${item.name}`);
  }
}
```

### Controller 模板

```typescript
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { YourModuleService } from './your-module.service';
import { CreateYourModuleDto } from './dto/create-your-module.dto';
import { UpdateYourModuleDto } from './dto/update-your-module.dto';
import { QueryYourModuleDto } from './dto/query-your-module.dto';
import { YourModuleVo } from './dto/your-module.vo';
import { Result } from '../../common/dto/result.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('你的模块')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('your-module')
export class YourModuleController {
  constructor(private readonly yourModuleService: YourModuleService) {}

  @Post()
  @ApiOperation({ summary: '创建' })
  @ApiResponse({ status: 200, description: '创建成功', type: YourModuleVo })
  async create(
    @Body() createDto: CreateYourModuleDto,
  ): Promise<Result<YourModuleVo>> {
    const item = await this.yourModuleService.create(createDto);
    return Result.success(item, '创建成功');
  }

  @Get()
  @ApiOperation({ summary: '查询列表' })
  async findAll(@Query() queryDto: QueryYourModuleDto): Promise<Result> {
    const result = await this.yourModuleService.findAll(queryDto);
    return Result.page(result.list, result.total, result.page, result.pageSize);
  }

  @Get(':id')
  @ApiOperation({ summary: '查询详情' })
  @ApiResponse({ status: 200, description: '查询成功', type: YourModuleVo })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Result<YourModuleVo>> {
    const item = await this.yourModuleService.findById(id);
    return Result.success(item);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新' })
  @ApiResponse({ status: 200, description: '更新成功', type: YourModuleVo })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateYourModuleDto,
  ): Promise<Result<YourModuleVo>> {
    const item = await this.yourModuleService.update(id, updateDto);
    return Result.success(item, '更新成功');
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Result<void>> {
    await this.yourModuleService.remove(id);
    return Result.success(null, '删除成功');
  }
}
```

### Module 模板

```typescript
import { Module } from '@nestjs/common';
import { YourModuleService } from './your-module.service';
import { YourModuleController } from './your-module.controller';
import { YourModuleRepository } from './repositories/your-module.repository';

@Module({
  controllers: [YourModuleController],
  providers: [YourModuleService, YourModuleRepository],
  exports: [YourModuleService, YourModuleRepository],
})
export class YourModuleModule {}
```

## ✅ 检查清单

生成新模块后，请确认：

- [ ] 所有文件命名遵循 kebab-case
- [ ] DTO 添加了完整的验证装饰器
- [ ] Swagger 文档注解完整
- [ ] Service 中有完整的业务逻辑验证
- [ ] Repository 继承 BaseRepository
- [ ] Module 正确导出 Service 和 Repository
- [ ] 在 AppModule 中注册新模块
- [ ] Prisma Schema 已更新并生成
- [ ] 添加了适当的日志记录

## 🎯 最佳实践

1. **命名规范**: 保持一致的命名风格
2. **错误处理**: 使用 BusinessError 抛出业务异常
3. **日志记录**: 在关键操作点添加日志
4. **类型安全**: 充分利用 TypeScript 类型系统
5. **文档完善**: 为每个接口添加 Swagger 注解
6. **测试覆盖**: 为新模块编写单元测试

祝您开发愉快！🚀
