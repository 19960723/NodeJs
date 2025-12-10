import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { DictRepository } from './repositories/dict.repository';

@Module({
  controllers: [DictController],
  providers: [DictService, DictRepository],
})
export class DictModule {}
