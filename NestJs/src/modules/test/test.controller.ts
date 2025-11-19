import { Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  getTestInfo() {
    return this.testService.getTestInfo();
  }

  @Get('list')
  getTestList() {
    return this.testService.getTestList();
  }

  @Post('create')
  createTest() {
    return this.testService.createTest();
  }

  @Put('update/:id')
  updateTest(@Param('id') id: string) {
    return this.testService.updateTest(id);
  }

  @Delete('delete/:id')
  deleteTest(@Param('id') id: string) {
    return this.testService.deleteTest(id);
  }
}
