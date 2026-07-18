import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAccessGuard } from 'src/jwt-app/guard/jwt-access.guard';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { RequestWithUser } from 'src/jwt-app/types/requestWithUser';
import { TaskQueryDto } from './dto/query-task.dto';

@ApiBearerAuth('jwt')
@UseGuards(JwtAccessGuard)
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @ApiOperation({ summary: 'Get User Tasks' })
  @ApiResponse({ status: 200, type: [Task] })
  @ApiQuery({ name: 'boardId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'priority', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  @Get()
  async getAll(@Req() req: RequestWithUser, @Query() query: TaskQueryDto) {
    const userId = req.user.id;
    return this.taskService.getAll(userId, query);
  }

  @ApiOperation({ summary: 'Add new Task' })
  @ApiResponse({ status: 200, type: Task })
  @Post()
  async create(@Body() dto: CreateTaskDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.taskService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Task Updating' })
  @ApiResponse({ status: 200, type: Task })
  @Patch()
  async update(@Body() dto: UpdateTaskDto) {
    return this.taskService.update(dto.id, dto);
  }

  @ApiOperation({ summary: 'Task Deleting' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async dalete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
