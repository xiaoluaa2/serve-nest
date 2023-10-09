import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
// 引入 Mongoose 模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { BlogsSchema } from './blogs.schema';
import { CommentSchema } from './comment.schema';
// import { JwtStrategy } from './jwt.strategy';
const BlogsTable = MongooseModule.forFeature([
  { name: 'Blogs', schema: BlogsSchema },
]);
const CommentTable = MongooseModule.forFeature([
  { name: 'Comment', schema: CommentSchema },
]);
@Module({
  imports: [BlogsTable, CommentTable],
  controllers: [BlogsController],
  // providers: [BlogsService, JwtStrategy],
  providers: [BlogsService],
})
export class BlogsModule {}
