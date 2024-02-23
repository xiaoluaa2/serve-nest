import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MusicService } from './music.service';
@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post('addMusic')
  @UseGuards(AuthGuard('jwt'))
  async addMusic(@Body() music) {
    const res = await this.musicService.addMusic(music);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @Post('musicList')
  async MusicList(@Body() body) {
    const res = await this.musicService.musicList(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteMusic')
  async deleteMusic(@Body() body) {
    const res = await this.musicService.deleteMusic(body);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
}
