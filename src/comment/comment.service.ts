import { Injectable } from '@nestjs/common';
// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './comment.interface';
@Injectable()
export class CommentService {
  constructor(
    @InjectModel('Message') private readonly messageModel: Model<Comment>,
  ) {}
  // 发布评论
  async postComment(body) {
    console.log('----------------------------------------');
    const obj = {
      url: body.url,
      content: body.text,
      publishdate: new Date().getTime(), //评论发布时间
      userId: body.nickName,
      head: body.head,
      thumbup: 0, //评论被点赞数
      commentNum: 0, //回复数量
      city: body.city,
    };
    if (body.parentId) {
      obj['parentId'] = body.parentId;
    }
    const res = await this.messageModel.create(obj);
    return res;
  }

  // 获取评论
  async findAll(body) {
    if (!body.PagnationData) {
      const res = await this.messageModel.find().sort({ publishdate: -1 });
      return res;
    }
    const { Skip, Limit } = body.PagnationData;
    const res = await this.messageModel
      .find()
      .sort({ publishdate: -1 })
      .skip(Skip)
      .limit(Limit);
    return {
      data: res,
      total: await this.messageModel.count(),
    };
  }
  // 获取评论 带层级
  async getCommentListTier(body) {
    const { Skip, Limit } = body;
    console.log(body);

    const pipeline: any = [
      // {
      //   $sort: {
      //     publishdate: -1, // 先按时间倒序排序
      //   },
      // },
      { $sort: { publishdate: -1 } },
      {
        $lookup: {
          from: 'messages',
          localField: '_id',
          foreignField: 'parentId',
          as: 'son',
        },
      },

      {
        $match: {
          // 只留下顶级评论
          // parentId: { $in: ['0'] },
          parentId: { $exists: false },
        },
      },
      {
        $skip: parseInt(Skip), // 跳过(page-1)*page_size条文档数，供分页使用
      },
      {
        $limit: parseInt(Limit), // 限制返回的文档数为page_size，供分页使用
      },
    ];
    const res = await this.messageModel.aggregate(pipeline);

    // const res = (await this.messageModel.find({ parentId: '0' })).reverse();
    // res.forEach((item) => {
    //   if(item._id)
    // });
    // console.log(res);
    return res;
  }

  //修改评论
  async updateComment(body) {
    console.log('body');
    console.log(body);
    const updatedExample = await this.messageModel.findOneAndUpdate(
      { _id: body._id },
      {
        userId: body.MessageLeaveName,
        content: body.MessageText,
        city: body.LocationCityName,
        head: body.iconNo,
      },
      { new: true },
    );
    console.log(updatedExample);
    return updatedExample;
  }
  //删除评论
  async deleteComment(body) {
    const res = await this.messageModel.deleteOne({ _id: body._id });
    return res;
  }
  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
