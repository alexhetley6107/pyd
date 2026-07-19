import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends CreateTaskDto {
  @ApiProperty({
    example: '8c446d00-a6aa-4225-b836-afdb9586d551',
    description: 'ID of your Task',
  })
  readonly id: string;
}
