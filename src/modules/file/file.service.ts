import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  upload(file: Express.Multer.File) {
    const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const filePath = path.join(uploadDir, file.originalname);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    fs.writeFileSync(filePath, file.buffer);

    return {
      path: filePath,
    };
  }
}
