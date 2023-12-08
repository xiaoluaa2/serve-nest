import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  // @UseGuards(AuthGuard('jwt'))
  @Post('addBlogs')
  async create(@Body() createBlogDto) {
    delete createBlogDto.Token;
    const res = await this.blogsService.create(createBlogDto);
    if (res) {
      return {
        code: 200,
        message: 'Success',
      };
    }
    return 'err';
  }
  // 博文，评论，点击总数
  @Post('BlogsSum')
  async BlogsSum() {
    const res = await this.blogsService.BlogsSum();
    return res;
  }

  @Post('getBlogsList')
  findAll(@Body() body) {
    return this.blogsService.findAll(body);
  }
  // 随机文章
  @Post('getBlogsRandom')
  getBlogsRandom() {
    return this.blogsService.getBlogsRandom();
  }
  @Post('detail')
  async findOne(@Body() blog) {
    console.log('----');
    console.log(blog);
    console.log('----');
    const res = await this.blogsService.findOne(blog);
    return res;
  }
  // @UseGuards(AuthGuard('jwt'))
  @Post('articleUpdate')
  articleUpdate(@Body() blog) {
    return this.blogsService.articleUpdate(blog);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post('deleteBlog')
  deleteBlog(@Body() blog) {
    return this.blogsService.deleteBlog(blog);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }
  // 点击量
  @Post('addLook')
  addLook(@Body() body) {
    return this.blogsService.addLook(body.id);
  }
  // 发布评论
  @Post('postComment')
  postComment(@Body() body) {
    return this.blogsService.postComment(body);
  }
  // 获取评论
  @Post('getComment')
  getComment(@Body() body) {
    return this.blogsService.getComment(body);
  }

  // 所有评论
  @Post('getAllComment')
  getAllComment(@Body() body) {
    return this.blogsService.getAllComment(body);
  }

  // 删除评论
  @Post('deleteComment')
  deleteComment(@Body() body) {
    return this.blogsService.deleteComment(body);
  }
  // 更新评论
  @Post('commentUpdate')
  commentUpdate(@Body() body) {
    return this.blogsService.commentUpdate(body);
  }
  // 热门文章
  @Post('getHotList')
  getHotList() {
    return this.blogsService.getHotList();
  }
  // 模糊查询
  @Post('searchBlog')
  searchBlog(@Body() body) {
    return this.blogsService.searchBlog(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
