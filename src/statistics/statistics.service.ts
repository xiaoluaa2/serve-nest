import { Injectable } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { $format } from '../config/config.module';
// 引入数据类型
import { Statistics } from './statistics.interface';
@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel('statistics')
    private readonly statisticsModel: Model<Statistics>,
  ) {}
  create(createStatisticDto: CreateStatisticDto) {
    return 'This action adds a new statistic';
  }

  async findAll(body) {
    const res = await this.statisticsModel
      .find()
      .skip((body.Skip - 1) * body.Limit)
      .limit(body.Limit);
    return {
      data: res,
      total: await this.statisticsModel.count(),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} statistic`;
  }

  update(id: number, updateStatisticDto: UpdateStatisticDto) {
    return `This action updates a #${id} statistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} statistic`;
  }
  async foreend(body, ip) {
    const res = await this.statisticsModel.create({
      ...body,
      clientIp: ip,
    });
    console.log(res);
    return {
      message: '新增成功',
    };
  }

  async deleteStatistics(body) {
    console.log(body);
    const res = await this.statisticsModel.deleteOne({ _id: body._id });
    return res;
  }
  async showStatistics() {
    console.log($format('yyyy-MM-dd', Date.now()));
    const today = $format('yyyy-MM-dd', Date.now());
    const yesterday = $format('yyyy-MM-dd', Date.now() - 86400000);

    const res = await this.statisticsModel.find();
    const alldayVisit = res.length;
    const todayVisit = res.filter((item) => {
      return item.time == today;
    }).length;
    const yesterdayVisit = res.filter((item) => {
      return item.time == yesterday;
    }).length;
    const alldayPeople = new Set(
      res.map((item) => {
        return item.clientIp;
      }),
    ).size;
    const todayPeople = new Set(
      res
        .filter((item) => {
          return item.time == today;
        })
        .map((item) => {
          return item.clientIp;
        }),
    ).size;
    const yesterdayPeople = new Set(
      res
        .filter((item) => {
          return item.time == yesterday;
        })
        .map((item) => {
          return item.clientIp;
        }),
    ).size;
    return {
      alldayVisit,
      todayVisit,
      yesterdayVisit,
      alldayPeople,
      todayPeople,
      yesterdayPeople,
    };
  }
}
