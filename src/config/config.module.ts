//全局模块
import { DynamicModule, Global, Module } from '@nestjs/common';
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
export const $format = function FormatTime(t: string, date: number) {
  const _date = new Date(date);
  const o: any = {
    'M+': _date.getMonth() + 1, //月份
    'd+': _date.getDate(), //日
    'h+': _date.getHours(), //小时
    'm+': _date.getMinutes(), //分
    's+': _date.getSeconds(), //秒
    'q+': Math.floor((_date.getMonth() + 3) / 3), //季度
    S: _date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(t)) {
    t = t.replace(
      RegExp.$1,
      (_date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  for (const k in o) {
    // 我们在项目中的tsconfig.json文件中添加： "suppressImplicitAnyIndexErrors":true,
    if (new RegExp('(' + k + ')').test(t)) {
      t = t.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return t;
};
