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
  postComment(@Body() body) {
    return this.commentService.postComment(body);
  }

  @Post('getCommentList')
  findAll(@Body() body) {
    return this.commentService.findAll(body);
  }
  @Post('getCommentListTier')
  getCommentListTier(@Body() body) {
    return this.commentService.getCommentListTier(body);
  }
  // 修改评论
  @UseGuards(AuthGuard('jwt'))
  @Post('updateComment')
  updateComment(@Body() body) {
    return this.commentService.updateComment(body);
  }
  // 删除评论
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteComment')
  deleteComment(@Body() body) {
    return this.commentService.deleteComment(body);
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
