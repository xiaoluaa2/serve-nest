import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Post('addLink')
  @UseGuards(AuthGuard('jwt'))
  async addLink(@Body() link) {
    const res = await this.linkService.addLink(link);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @Post('linkList')
  async linkList(@Body() body) {
    const res = await this.linkService.linkList(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteLink')
  async deleteLink(@Body() body) {
    const res = await this.linkService.deleteLink(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
}
