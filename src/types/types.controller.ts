import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypesService } from './types.service';
@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Post('addTypes')
  async create(@Body() types) {
    const res = await this.typesService.create(types);
    console.log('addTypes');
    console.log(res);
    if (res) {
      return res;
    }
  }
  @Post('typeList')
  async typeList() {
    const res = await this.typesService.typeList();
    console.log('res');
    console.log(res);
    if (res) {
      return res;
    }
  }
  @Post('typeListHome')
  async typeListHome() {
    const res = await this.typesService.typeListHome();
    console.log('res');
    console.log(res);
    if (res) {
      return res;
    }
  }

  @Post('deleteType')
  async deleteType(@Body() tag) {
    const res = await this.typesService.deleteType(tag);
    console.log('res');
    console.log(res);
    if (res.acknowledged) {
      return res;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(+id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(+id);
  }
}
