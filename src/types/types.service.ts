import { Injectable } from '@nestjs/common';
import { UpdateTypeDto } from './dto/update-type.dto';
// 为了在 操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// 引入数据类型
// import { CreateBlogsDTO, EditBlogsDTO } from './blogs.dto';
import { Types } from './types.interface';
@Injectable()
export class TypesService {
  // 构造函数，让 user.service 在实例化时，能够接收到数据库 Model，进而操作数据库
  constructor(
    @InjectModel('Types') private readonly typesModel: Model<Types>,
  ) {}
  async create(body: Types) {
    let res = {};
    console.log(body.TagId);

    if (body.TagId) {
      res = await this.typesModel.findOneAndUpdate(
        { _id: body.TagId },
        { ...body },
        { new: true },
      );
    } else {
      res = await this.typesModel.create(body);
    }

    return res;
  }

  async typeList() {
    const res = await this.typesModel.find();
    return res;
  }
  async typeListHome() {
    const pipeline: any = [
      {
        $lookup: {
          from: 'blogs',
          localField: '_id',
          foreignField: 'ArticleTag',
          as: 'blogs',
        },
      },
    ];
    const res = await this.typesModel.aggregate(pipeline);
    return res.map((item) => {
      return {
        ...item,
        blogs: item.blogs.length,
      };
    });
  }

  async deleteType(tag) {
    console.log(tag);
    const res = await this.typesModel.deleteOne({ _id: tag._id });
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
