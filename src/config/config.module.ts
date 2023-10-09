//全局模块
import { Module, Global, DynamicModule } from '@nestjs/common';
interface Options {
  path: string;
}
@Global()
@Module({
  // 不可传参
  // providers: [
  //   {
  //     provide: 'Config',
  //     useValue: { baseUrl: '/api' },
  //   },
  // ],
  // exports: [
  //   {
  //     provide: 'Config',
  //     useValue: { baseUrl: '/api' },
  //   },
  // ],
})
export class ConfigModule {
  // 添加 static 方法传参
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseUrl: `/api/${options.path}` },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseUrl: `/api/${options.path}` },
        },
      ],
    };
  }
}
export const jwtKey = {
  secret: 'lgldl',
};
