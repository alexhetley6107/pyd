import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function ImageUploadInterceptor() {
  return FileInterceptor('file', {
    storage: diskStorage({
      destination: './images',
      filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.random().toString(36).slice(2);
        cb(null, unique + extname(file.originalname));
      },
    }),
    limits: {
      fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return cb(new BadRequestException('Only images allowed'), false);
      }
      cb(null, true);
    },
  });
}
