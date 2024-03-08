## 结构

src
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts

app.controller.ts 单个路由的基本控制器(Controller)
app.controller.spec.ts 针对控制器的单元测试
app.module.ts 应用程序的根模块(Module)
app.service.ts 具有单一方法的基本服务(Service)
main.ts 应用程序的入口文件，它使用核心函数  NestFactory  来创建 Nest 应用程序的实例。

cd src
nest g res 'name' 创建模块
commrnt

修改
