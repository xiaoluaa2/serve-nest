import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
// 引入 Mongoose 模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { linkSchema } from './link.schema';
// import { JwtStrategy } from './jwt.strategy';
const linkTable = MongooseModule.forFeature([
  { name: 'links', schema: linkSchema },
]);
@Module({
  imports: [linkTable],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
