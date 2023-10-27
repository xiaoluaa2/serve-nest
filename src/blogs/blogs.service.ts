import { Injectable } from '@nestjs/common';
import { UpdateBlogDto } from './dto/update-blog.dto';
// 为了在 user.service 中操作数据库
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// 引入数据类型
import { CreateBlogsDTO } from './blogs.dto';
import { Blogs, Comment } from './blogs.interface';
interface BlogsResponse<T = unknown> {
  code: number;
  data?: T;
  message: string;
}
@Injectable()
export class BlogsService {
  // 构造函数，让 user.service 在实例化时，能够接收到数据库 Model，进而操作数据库
  constructor(
    @InjectModel('Blogs') private readonly blogsModel: Model<Blogs>,
    @InjectModel('Comment') private readonly commentModel: Model<Comment>,
  ) {}

  async create(body: CreateBlogsDTO) {
    console.log('89798');
    console.log(body);
    const res = await this.blogsModel.create({
      ...body,
      hits: 0,
    });
    return res;
  }

  async findAll() {
    const pipeline: any = [
      {
        $lookup: {
          from: 'types',
          localField: 'ArticleTag',
          foreignField: '_id',
          as: 'TagName',
        },
      },
    ];
    const res = await this.blogsModel.aggregate(pipeline);
    return res.map((item) => {
      return {
        ...item,
        TagName: item.TagName[0].TagName,
      };
    });
  }
  async articleUpdate(blogs) {
    const res = await this.blogsModel.findOneAndUpdate(
      { _id: blogs._id },
      {
        ...blogs,
        ArticleTag: blogs.ArticleTag,
      },
      { new: true },
    );
    return res;
  }
  async deleteBlog(blogs) {
    const res = await this.blogsModel.deleteOne({ _id: blogs._id });
    return res;
  }

  async findOne(blog) {
    console.log('4556');
    console.log(blog);
    console.log('4556');
    return await this.blogsModel.findById(blog.id).exec();
  }
  // 博文，评论，点击总数
  async BlogsSum() {
    const Hits = await this.blogsModel.aggregate([
      {
        $group: {
          _id: null,
          hitsTotal: { $sum: '$hits' },
        },
      },
    ]);
    const Comments = await this.blogsModel.aggregate([
      {
        $group: {
          _id: null,
          commentTotal: { $sum: '$CommentNum' },
        },
      },
    ]);

    const Blogs = await this.blogsModel.count();
    return {
      Blogs,
      Hits: Hits[0].hitsTotal,
      Comments: Comments[0].commentTotal,
    };
  }
  // 点击量
  async addLook(id) {
    const res = await this.blogsModel.findOneAndUpdate(
      { _id: id },
      { $inc: { hits: 1 } }, // 自增 num 字段
      { new: true },
    );
  }
  // 发布评论
  async postComment(body) {
    if (body.parentId) {
      await this.commentModel.findOneAndUpdate(
        { _id: body.parentId },
        { $inc: { commentNum: 1 } }, // 自增 num 字段
        { new: true },
      );
    }

    await this.blogsModel.findOneAndUpdate(
      { _id: body.cid },
      { $inc: { CommentNum: 1 } }, // 自增 num 字段
      { new: true },
    );

    const res = await this.commentModel.create({
      email: body.email,
      url: body.url,
      cid: body.cid, //文章id
      content: body.text,
      publishdate: new Date().getTime(), //评论发布时间
      userId: body.nickName,
      thumbup: 0, //评论被点赞数
      parentId: body.parentId ? body.parentId : 0, //0表示评论文章；若是评论的是评论则为被评论的评论c_id
      commentNum: 0, //回复数量
      city: body.city,
    });
    return res;
  }
  // 获取评论
  async getComment(body) {
    const res = await this.commentModel.find({
      cid: body.cid,
      // parentId: body.parentId ? body.parentId : 0,
    });
    return res.reverse();
  }
  // 热门文章
  async getHotList() {
    const res = await this.blogsModel.find().sort({ hits: 1 }).limit(5);
    return res.map((item) => {
      return {
        title: item.Title,
        _id: item._id,
        CreateDate: item.CreateDate,
        ArticleCover: item.ArticleCover,
      };
    });
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
