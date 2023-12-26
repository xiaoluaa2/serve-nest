import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  // 发布评论
  @Post('postComment')
  async postComment(@Body() body) {
    const res = await this.commentService.postComment(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  @Post('getCommentList')
  async findAll(@Body() body) {
    const res = await this.commentService.findAll(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @Post('getCommentListTier')
  async getCommentListTier(@Body() body) {
    const res = await this.commentService.getCommentListTier(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  // 修改评论
  @UseGuards(AuthGuard('jwt'))
  @Post('updateComment')
  async updateComment(@Body() body) {
    const res = await this.commentService.updateComment(body);
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
    const res = await this.commentService.deleteComment(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
