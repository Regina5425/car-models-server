import { ApiProperty } from '@nestjs/swagger';

export class FileUploadResponseDto {
  @ApiProperty({
    description: 'Путь к загруженному файлу',
    example: '/path/to/uploaded/file.png',
  })
  path: string;
}
