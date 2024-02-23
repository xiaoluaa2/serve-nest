import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
// 引入 Mongoose 模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { musicSchema } from './music.schema';
const musicTable = MongooseModule.forFeature([
  { name: 'musics', schema: musicSchema },
]);
@Module({
  imports: [musicTable],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
