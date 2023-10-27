import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
// 引入 Mongoose 模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { CommentSchema } from './comment.schema';

const CommentTable = MongooseModule.forFeature([
  { name: 'Message', schema: CommentSchema },
]);
@Module({
  imports: [CommentTable],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
