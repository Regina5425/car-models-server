import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh Token',
    example: 'refresh-token-example-string',
    type: String,
  })
  @IsString()
  refreshToken: string;
}

export class RefreshTokenResponseDto {
  @ApiProperty({
    description: 'Access Token',
    example: 'access-token-example-string',
    type: String,
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh Token',
    example: 'refresh-token-example-string',
    type: String,
  })
  refreshToken: string;
}
