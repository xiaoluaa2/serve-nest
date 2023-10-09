import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CreateBlogsDTO, EditBlogsDTO } from './blogs.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('addBlogs')
  async create(@Body() createBlogDto) {
    delete createBlogDto.Token;
    const res = await this.blogsService.create(createBlogDto);
    console.log('res');
    console.log(res);
    if (res) {
      return {
        code: 200,
        message: 'Success',
      };
    }
    console.log(createBlogDto);
    return 55;
  }
  // 博文，评论，点击总数
  @Post('BlogsSum')
  async BlogsSum() {
    const res = await this.blogsService.BlogsSum();
    return res;
  }

  @Post('getBlogsList')
  findAll() {
    return this.blogsService.findAll();
  }

  @Post('detail')
  async findOne(@Body() blog) {
    const res = await this.blogsService.findOne(blog);
    return res;
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('articleUpdate')
  articleUpdate(@Body() blog) {
    return this.blogsService.articleUpdate(blog);
  }

  @UseGuards(AuthGuard('jwt'))
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }
}
