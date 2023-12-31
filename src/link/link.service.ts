import { Injectable } from '@nestjs/common';
// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// 引入数据类型
import { Link } from './link.interface';
@Injectable()
export class LinkService {
  // 构造函数，让 user.service 在实例化时，能够接收到数据库 Model，进而操作数据库
  constructor(@InjectModel('links') private readonly linkModel: Model<Link>) {}
  async addLink(body) {
    console.log(body);
    if (body._id) {
      await this.linkModel.findOneAndUpdate(
        { _id: body._id },
        {
          ...body,
        },
        { new: true },
      );
      return {
        message: '修改成功',
      };
    } else {
      await this.linkModel.create(body);
      return {
        message: '新增成功',
      };
    }
  }
  async linkList(body) {
    const res = await this.linkModel
      .find()
      .sort('rank')
      .skip(body.Skip * body.Limit)
      .limit(body.Limit);
    return {
      data: res,
      total: await this.linkModel.count(),
    };

    // const res = await this.linkModel.create(body);
    // return res;
  }
  async deleteLink(body) {
    console.log(body);
    const res = await this.linkModel.deleteOne({ _id: body._id });
    return res;
  }
}
