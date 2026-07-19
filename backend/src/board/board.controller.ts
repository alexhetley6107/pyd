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
import { CreateBoardDto } from './dto/create-board.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Board } from './board.model';
import { JwtAccessGuard } from 'src/jwt-app/guard/jwt-access.guard';
import { BoardService } from './board.service';
import { UpdateBoardDto } from './dto/update-board.dto';
import { RequestWithUser } from 'src/jwt-app/types/requestWithUser';
import { BoardQueryDto } from './dto/query-board.dto';

@ApiBearerAuth('jwt')
@UseGuards(JwtAccessGuard)
@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @ApiOperation({ summary: 'Get All User Boards' })
  @ApiResponse({ status: 200, type: [Board] })
  @Get()
  async getAll(@Req() req: RequestWithUser, @Query() query: BoardQueryDto) {
    const userId = req.user.id;
    return this.boardService.getAll(userId, query);
  }

  @ApiOperation({ summary: 'Get Board by id' })
  @ApiResponse({ status: 200, type: [Board] })
  @Get(':id')
  async getOne(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.boardService.getOne(id);
  }

  @ApiOperation({ summary: 'Board Creation' })
  @ApiResponse({ status: 200, type: Board })
  @Post()
  async create(@Body() dto: CreateBoardDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.boardService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Board Updating' })
  @ApiResponse({ status: 200, type: Board })
  @Patch()
  async update(@Body() dto: UpdateBoardDto) {
    return this.boardService.update(dto.id, dto);
  }

  @ApiOperation({ summary: 'Board Deleting' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.boardService.delete(id);
  }
}
