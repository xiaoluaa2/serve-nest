import { Body, Controller, Post, Request } from '@nestjs/common';
import { Request as ExpRequest } from 'express';
import { StatisticsService } from './statistics.service';
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Post('getStatisticsList')
  async findAll(@Body() body) {
    const res = await this.statisticsService.findAll(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  @Post('foreend')
  async createForeend(@Body() foreend, @Request() request: ExpRequest) {
    const res = await this.statisticsService.foreend(foreend, request.ip);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @Post('deleteStatistics')
  async deleteStatistics(@Body() body) {
    const res = await this.statisticsService.deleteStatistics(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @Post('showStatistics')
  async showStatistics() {
    const res = await this.statisticsService.showStatistics();
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
}
