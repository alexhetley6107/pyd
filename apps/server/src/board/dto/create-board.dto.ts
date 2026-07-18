import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({ example: 'Green Project', description: 'Name of your project board' })
  readonly name: string;
}
