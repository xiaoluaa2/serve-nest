import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { Request as ExpRequest } from 'express';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { StatisticsService } from './statistics.service';
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post()
  abcbc(@Body() createStatisticDto: CreateStatisticDto) {
    console.log(55555555555);
    return 55555;
  }

  @Post('getStatisticsList')
  findAll(@Body() body) {
    return this.statisticsService.findAll(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statisticsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStatisticDto: UpdateStatisticDto,
  ) {
    return this.statisticsService.update(+id, updateStatisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statisticsService.remove(+id);
  }

  @Post('foreend')
  createForeend(@Body() foreend, @Request() request: ExpRequest) {
    console.log(request.ip);
    return this.statisticsService.foreend(foreend, request.ip);
  }
  @Post('deleteStatistics')
  deleteStatistics(@Body() body) {
    return this.statisticsService.deleteStatistics(body);
  }
  @Post('showStatistics')
  showStatistics() {
    return this.statisticsService.showStatistics();
  }
}
