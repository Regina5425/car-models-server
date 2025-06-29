import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRole } from 'generated/prisma';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { FileUploadResponseDto } from './dto/file-upload.dto';

@ApiTags('File')
@ApiBearerAuth()
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiOperation({
    summary: 'Загрузка файла',
    description:
      'Метод загрузки одного файла (картинки). Поддерживаемые форматы: jpeg, jpg, png, webp, gif. Максимальный размер: 10 МБ.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Файл для загрузки',
    required: true,
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description:
            'Поддерживаемые форматы: jpeg, jpg, png, webp, gif. Максимальный размер: 10 МБ.',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Файл успешно загружен',
    type: FileUploadResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Неверный формат файла или превышен максимальный размер',
  })
  @ApiUnauthorizedResponse({ description: 'Не авторизован' })
  @ApiForbiddenResponse({ description: 'Нет прав доступа (только для ADMIN)' })
  @Post('upload')
  @Auth(UserRole.ADMIN)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: /\/(jpeg|jpg|png|webp|gif)$/,
          }),
          new MaxFileSizeValidator({
            maxSize: 1000 * 1000 * 10,
            message: 'Можно загружать файлы не больше 10 МБ',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.upload(file);
  }
}
