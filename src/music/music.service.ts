import { Injectable } from '@nestjs/common';
// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// 引入数据类型
import { Music } from './music.interface';
@Injectable()
export class MusicService {
  // 构造函数，让 user.service 在实例化时，能够接收到数据库 Model，进而操作数据库
  constructor(
    @InjectModel('musics') private readonly musicModel: Model<Music>,
  ) {}
  async addMusic(body) {
    console.log(body);
    if (body._id) {
      await this.musicModel.findOneAndUpdate(
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
      await this.musicModel.create(body);
      return {
        message: '新增成功',
      };
    }
  }
  async musicList(body) {
    const res = await this.musicModel
      .find()
      .skip(body.Skip * body.Limit)
      .limit(body.Limit);
    return {
      data: res,
      total: await this.musicModel.count(),
    };

    // const res = await this.linkModel.create(body);
    // return res;
  }
  async deleteMusic(body) {
    console.log(body);
    const res = await this.musicModel.deleteOne({ _id: body._id });
    return res;
  }
}
