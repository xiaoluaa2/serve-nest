import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { GuardModule } from './guard/guard.module';
import { LoginModule } from './login/login.module';
import { TestModule } from './test/test.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
// import { JwtModule } from './jwt/jwt.module';
import { BlogsModule } from './blogs/blogs.module';
import { CommentModule } from './comment/comment.module';
import { LinkModule } from './link/link.module';
import { StatisticsModule } from './statistics/statistics.module';
import { TypesModule } from './types/types.module';
@Module({
  //  模块依赖其他模块
  // imports: [BlogsModule],
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:Lu.13290525519@47.116.126.150:27017',
      {
        dbName: 'blog',
      },
    ),
    // MongooseModule.forRoot('mongodb://8.134.160.8/blog'),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: 'password',
    //   database: 'test',
    //   entities: [],
    //   synchronize: true,
    // }),
    UserModule,
    ConfigModule.forRoot({
      path: 'xiaolu',
    }),
    UploadModule,
    TestModule,
    LoginModule,
    GuardModule,
    BlogsModule,
    TypesModule,
    CommentModule,
    LinkModule,
    StatisticsModule,
  ],
  // 必须实例的controller类
  controllers: [AppController],
  // 允许交给模块实例化的类，包括不限于Service等
  providers: [AppService],
})
export class AppModule {}
