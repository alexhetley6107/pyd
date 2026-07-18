import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from './task.providers';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Op } from 'sequelize';
import { TaskQueryDto } from './dto/query-task.dto';

@Injectable()
export class TaskService {
  constructor(@Inject(TASK_REPOSITORY) private taskModel: typeof Task) {}

  async getAll(userId: string, filters: TaskQueryDto) {
    const where: Record<string, unknown> = { userId };

    if (filters.boardId) {
      where.boardId = filters.boardId === 'null' ? null : filters.boardId;
    }
    if (filters.id) where.id = filters.id;
    if (filters.status) where.status = filters.status;
    if (filters.priority) where.priority = filters.priority;
    if (filters.search) {
      (where as any)[Op.or] = [
        { title: { [Op.iLike]: `%${filters.search}%` } },
        { description: { [Op.iLike]: `%${filters.search}%` } },
      ];
    }

    // const limit = filters.limit ? parseInt(filters.limit, 10) : 10;
    // const offset = filters.offset ? parseInt(filters.offset, 10) : 0;

    const tasks = await this.taskModel.findAll({
      where,
      // limit,
      // offset,
      order: [['updatedAt', 'DESC']],
    });
    return tasks?.map((b) => b?.get({ plain: true }));
  }

  async create(dto: CreateTaskDto, userId: string) {
    const statusColumnTasks = await this.taskModel.findAll({
      where: {
        boardId: dto.boardId,
        status: dto.status,
      },
    });

    const task = await this.taskModel.create({
      ...dto,
      userId,
      order: statusColumnTasks.length + 1,
    });
    return task?.get({ plain: true });
  }

  async delete(id: string) {
    const task = await this.taskModel.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }
    await task.destroy();
  }

  async update(id: string, dto: Partial<UpdateTaskDto>) {
    await this.taskModel.update(dto, { where: { id } });

    const task = await this.taskModel.findOne({ where: { id } });
    return task?.get({ plain: true });
  }

  async deleteAll(userId: string) {
    const tasks = await this.taskModel.findAll({ where: { userId } });

    await Promise.all(tasks.map((t) => t.destroy()));
  }
}
