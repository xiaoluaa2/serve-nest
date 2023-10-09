import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
// 管道 自己写
// import { TestPipe } from './test.pipe';
import * as uuid from 'uuid';
console.log(uuid.v4());

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  // create(@Body(TestPipe) createTestDto: CreateTestDto) {
  create(@Body() createTestDto: CreateTestDto) {
    return this.testService.create(createTestDto);
  }

  @Get()
  findAll() {
    return this.testService.findAll();
  }
  // 管道转换
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    return this.testService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestDto: UpdateTestDto) {
    return this.testService.update(+id, updateTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testService.remove(+id);
  }
}
