import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'lex', description: 'User nickname' })
  readonly nickname: string;
  @ApiProperty({ example: 'test@email.com', description: 'User email' })
  readonly email: string;
  @ApiProperty({ example: 'Test123!', description: 'User password' })
  readonly password: string;
}
