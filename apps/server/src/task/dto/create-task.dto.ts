import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Task Tilte', description: 'Title of the task' })
  readonly title: string;

  @ApiProperty({ example: 'Task Description', description: 'Description of the task' })
  readonly description?: string;

  @ApiProperty({ example: 'Normal', description: 'Task priority' })
  readonly priority?: string;

  @ApiProperty({ example: 'Date', description: 'Task date' })
  readonly date?: string;

  @ApiProperty({
    example: '8c446d00-a6aa-4225-b836-afdb9586d551',
    description: 'Task board',
  })
  readonly boardId?: string;

  @ApiProperty({
    example: 'TO DO',
    description: 'Task statuS column',
  })
  readonly status?: string;
}
