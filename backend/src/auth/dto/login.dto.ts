import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'lex', description: 'User name' })
  readonly login: string;
  @ApiProperty({ example: 'Test123!', description: 'User password' })
  readonly password: string;
}
