import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 博文，评论，点击总数
  @Post('BlogsSum')
  async BlogsSum() {
    const res = await this.blogsService.BlogsSum();
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  @Post('getBlogsList')
  async findAll(@Body() body) {
    const res = await this.blogsService.findAll(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 随机文章
  @Post('getBlogsRandom')
  async getBlogsRandom() {
    const res = await this.blogsService.getBlogsRandom();
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @Post('detail')
  async findOne(@Body() blog) {
    const res = await this.blogsService.findOne(blog);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('articleUpdate')
  async articleUpdate(@Body() blog) {
    const res = await this.blogsService.articleUpdate(blog);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteBlog')
  async deleteBlog(@Body() blog) {
    const res = await this.blogsService.deleteBlog(blog);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(+id, updateBlogDto);
  }
  // 点击量
  @Post('addLook')
  async addLook(@Body() body) {
    const res = await this.blogsService.addLook(body.id);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 发布评论
  @Post('postComment')
  async postComment(@Body() body) {
    const res = await this.blogsService.postComment(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 获取评论
  @Post('getComment')
  async getComment(@Body() body) {
    const res = await this.blogsService.getComment(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  // 所有评论
  @Post('getAllComment')
  async getAllComment(@Body() body) {
    const res = await this.blogsService.getAllComment(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  // 删除评论
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteComment')
  async deleteComment(@Body() body) {
    const res = await this.blogsService.deleteComment(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 更新评论
  @UseGuards(AuthGuard('jwt'))
  @Post('commentUpdate')
  async commentUpdate(@Body() body) {
    const res = await this.blogsService.commentUpdate(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 热门文章
  @Post('getHotList')
  async getHotList() {
    const res = await this.blogsService.getHotList();
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 模糊查询
  @Post('searchBlog')
  async searchBlog(@Body() body) {
    const res = await this.blogsService.searchBlog(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    const res = await this.blogsService.remove(+id);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
}
