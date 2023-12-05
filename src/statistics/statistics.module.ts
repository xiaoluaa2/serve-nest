import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
// 引入 Mongoose 模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { statisticsSchema } from './statistics.schema';
// import { JwtStrategy } from './jwt.strategy';
const statisticsTable = MongooseModule.forFeature([
  { name: 'statistics', schema: statisticsSchema },
]);
@Module({
  imports: [statisticsTable],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
