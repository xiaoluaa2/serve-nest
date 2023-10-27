import { Module } from '@nestjs/common';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
// 引入 Mongoose 模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { TypesSchema } from './types.schema';
// import { JwtStrategy } from './jwt.strategy';
const TypesTable = MongooseModule.forFeature([
  { name: 'Types', schema: TypesSchema },
]);

@Module({
  imports: [TypesTable],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
