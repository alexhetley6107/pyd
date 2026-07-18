import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 'asdasddsaasd', description: 'User reset passwort token' })
  token: string;
  @ApiProperty({ example: 'Test123!', description: 'New User password' })
  newPassword: string;
}
