import { ApiProperty } from '@nestjs/swagger';
import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { CreateUserDto } from './dto/create-user.dto';
import { Task } from 'src/task/task.model';
import { Board } from 'src/board/board.model';

@Table({ tableName: 'users' })
export class User extends Model<User, CreateUserDto> {
  @ApiProperty({
    example: 'e8b5a51c-cf3b-4a43-9d57-d1d6aeb3cdd3',
    description: 'User ID (UUID)',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'test@email.com', description: 'User email' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: 'John Doe', description: 'User nickname' })
  @Column({ type: DataType.STRING, allowNull: false })
  nickname: string;

  @ApiProperty({ example: 'Test123!', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'url', description: 'User photo' })
  @Column({ type: DataType.STRING, allowNull: true })
  photo: string;

  @Column({ type: DataType.STRING, allowNull: true })
  resetToken: string | null;

  @Column({ type: DataType.DATE, allowNull: true })
  resetTokenExpiry: Date | null;

  @HasMany(() => Board)
  boards: Board[];

  @HasMany(() => Task)
  tasks: Task[];
}
