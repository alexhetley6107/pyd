import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto {
  @ApiProperty({ example: 'Green Project', description: 'Name of your project board' })
  readonly name: string;

  @ApiProperty({
    example: '8c446d00-a6aa-4225-b836-afdb9586d551',
    description: 'ID of your project board',
  })
  readonly id: string;
}
