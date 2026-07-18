import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'test@email.com', description: 'User email' })
  readonly email: string;
}
