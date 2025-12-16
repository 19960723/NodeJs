import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditLogService } from './audit-log.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { PermissionsGuard } from '../../../common/guards/permissions.guard';
// import { Permissions } from '../../../common/decorators/permissions.decorator';
import { PageDto } from '../../../common/dto/page.dto';

@ApiTags('系统管理-审计日志')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
@Controller('system/audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @ApiOperation({ summary: '获取审计日志列表' })
  // @Permissions('system:audit-log:list')
  async findAll(
    @Query() pageDto: PageDto,
    @Query('userId') userId?: number,
    @Query('action') action?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const { page = 1, pageSize = 10 } = pageDto;
    return this.auditLogService.findAll({
      page,
      pageSize,
      userId: userId ? Number(userId) : undefined,
      action,
      startDate,
      endDate,
    });
  }
}
