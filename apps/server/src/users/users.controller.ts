import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAccessGuard } from 'src/jwt-app/guard/jwt-access.guard';
import {
  Controller,
  Post,
  Delete,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { ImageUploadInterceptor } from './interceptors/image-upload.interceptor';
@ApiBearerAuth('jwt')
@UseGuards(JwtAccessGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'User Deleting' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @ApiOperation({ summary: 'Upload User photo' })
  @ApiResponse({ status: 200 })
  @Post('upload-photo')
  @UseInterceptors(ImageUploadInterceptor())
  async uploadPhoto(@UploadedFile() file: Express.Multer.File, @Req() req) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const userId = req.user.id;

    return this.userService.updatePhoto(userId, file.filename);
  }
}
