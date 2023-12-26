import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TypesService } from './types.service';
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(AuthGuard('jwt'))
  @Post('addTypes')
  async create(@Body() types) {
    const res = await this.typesService.create(types);
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  @Post('typeList')
  async typeList() {
    const res = await this.typesService.typeList();
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }

  @Post('typeListHome')
  async typeListHome() {
    const res = await this.typesService.typeListHome();
    if (res) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('deleteType')
  async deleteType(@Body() tag) {
    const res = await this.typesService.deleteType(tag);
    if (res.acknowledged) {
      return {
        success: res,
      };
    } else {
      return { error: res };
    }
  }
}
