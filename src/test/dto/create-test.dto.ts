import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';
// npm i class-validator class-transformer  安装这两个库 做校验
export class CreateTestDto {
  @Length(5, 10, {
    message: '字符在5-10之间',
  })
  @IsNotEmpty({
    message: '不能为空',
  })
  @IsString({
    message: '必须为字符串',
  })
  name: string;
  @IsNumber()
  age: number;
}
