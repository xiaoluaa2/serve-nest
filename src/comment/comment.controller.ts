import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  @Post('updateComment')
  updateComment(@Body() body) {
    return this.commentService.updateComment(body);
  }
  // 删除评论
  @Post('deleteComment')
  deleteComment(@Body() body) {
    return this.commentService.deleteComment(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
