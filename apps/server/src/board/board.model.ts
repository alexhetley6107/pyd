import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Table,
  Column,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/users/users.model';
import { Task } from 'src/task/task.model';

type CreateBoardAttrs = CreateBoardDto & { userId: string };

@Table({ tableName: 'boards' })
export class Board extends Model<Board, CreateBoardAttrs> {
  @ApiProperty({
    example: 'e8b5a51c-cf3b-4a43-9d57-d1d6aeb3cdd3',
    description: 'Board ID (UUID)',
  })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  declare id: string;

  @ApiProperty({ example: 'Green Project', description: 'Name of your project board' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Description Green Project',
    description: 'Description of your project board',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Task)
  tasks: Task[];
}
