import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserService2 } from './user.service2';
import { UserController } from './user.controller';

// 引入 Mongoose 模块
import { MongooseModule } from '@nestjs/mongoose';
// 引入用户数据表的格式
import { userSchema } from './user.schema';

// 中间件
import { Logger } from 'src/middleware';

const UserTable = MongooseModule.forFeature([
  { name: 'Users', schema: userSchema },
]);

@Module({
  imports: [UserTable],
  controllers: [UserController],
  // 简写 默认命名
  // providers: [UserService],
  providers: [
    UserService2,
    {
      provide: 'ABC',
      useClass: UserService,
    },
    // 使用自定义值
    {
      provide: 'zidingyizhi',
      useValue: ['A', 'B', 'C'],
    },
    // 工厂模式 可以注入Service
    {
      provide: 'gongchang',
      inject: [UserService2],
      useFactory(UserService2: UserService2) {
        console.log(UserService2.getHello());
        return 123;
        // 可以异步
      },
    },
  ],
  // 导出共享模块 可以在其他模块使用
  exports: [UserService2],
})
// 使用中间件
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Logger).forRoutes('user');
    consumer.apply(Logger).forRoutes({
      path: 'user',
      method: RequestMethod.GET,
    });
  }
}
