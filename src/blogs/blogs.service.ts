/* eslint-disable prettier/prettier */
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

  async findAll(body) {
    // tag pageNum
    console.log(564665);
    console.log(body);

    const pipeline: any = [
      { $sort: { CreateDate: -1 } },
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
    if (body.body && body.body.tag) {
      const arr = res
        .map((item) => {
          return {
            ...item,
            TagName: item.TagName[0].TagName,
          };
        })
        .filter((item) => {
          return item.TagName == body.body.tag;
        })
        .map((item, index) => {
          return {
            ...item,
            number: index + 1,
          };
        });
      const list = arr.slice(
        (body.body.pageNum - 1) * 20,
        body.body.pageNum * 20,
      );
      return {
        total: arr.length,
        list,
      };
    } else {
      const arr = res
        .map((item) => {
          return {
            ...item,
            TagName: item.TagName[0].TagName,
          };
        })
        .map((item, index) => {
          return {
            ...item,
            number: index + 1,
          };
        });
      const list = arr.slice(
        (body.body.pageNum - 1) * 6,
        body.body.pageNum * 6,
      );
      return {
        total: arr.length,
        list,
      };
    }
  }
  // 随机文章
  async getBlogsRandom() {
    // 设置随机排序
    const pipeline = [{ $sample: { size: 1 } }];
    const res = await this.blogsModel.aggregate(pipeline);
    return res;
  }
  // 更新
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
    console.log(await this.blogsModel.findById(blog.id).exec());

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
    return res;
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
      head: body.head,
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
  // 所有评论
  async getAllComment(body) {
    const { Skip, Limit } = body;
    console.log(body);
    const pipeline: any = [
      {
        $lookup: {
          from: 'blogs',
          localField: 'cid',
          foreignField: '_id',
          as: 'blog',
        },
      },
      {
        $skip: parseInt(Skip), // 跳过(page-1)*page_size条文档数，供分页使用
      },
      {
        $limit: parseInt(Limit), // 限制返回的文档数为page_size，供分页使用
      },
    ];
    let res = await this.commentModel.aggregate(pipeline);
    res = res.map((item) => {
      return {
        ...item,
        blog: item.blog[0].Title,
      };
    });
    return {
      commentList: res,
      total: await this.commentModel.count(),
    };
  }
  //删除评论
  async deleteComment(body) {
    console.log(body);
    const res = await this.commentModel.deleteOne({ _id: body._id });
    return res;
  }
  // 更新评论
  async commentUpdate(blogs) {
    console.log(blogs);

    const res = await this.commentModel.findOneAndUpdate(
      { _id: blogs._id },
      {
        ...blogs,
      },
      { new: true },
    );
    return res;
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
  // 模糊查询
  async searchBlog(body) {
    const regex = new RegExp(body.text);
    // const res = await this.blogsModel.find({ Title: regex });
    const res = await this.blogsModel.find({
      $or: [{ Title: regex }, { Summary: regex }],
    });

    return res;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
