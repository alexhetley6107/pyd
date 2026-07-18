import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.model';
import { BOARD_REPOSITORY } from './board.providers';
import { BoardQueryDto } from './dto/query-board.dto';
import { Op } from 'sequelize';

@Injectable()
export class BoardService {
  constructor(@Inject(BOARD_REPOSITORY) private boardModel: typeof Board) {}

  async create(dto: CreateBoardDto, userId: string) {
    const board = await this.boardModel.create({ ...dto, userId });
    return board?.get({ plain: true });
  }

  async findByName(name: string, userId: string) {
    const board = await this.boardModel.findOne({ where: { name, userId } });
    return board?.get({ plain: true });
  }

  async getAll(userId: string, filters: BoardQueryDto) {
    const where: Record<string, unknown> = { userId };

    if (filters.search) {
      (where as any)[Op.or] = [
        { name: { [Op.iLike]: `%${filters.search}%` } },
        { description: { [Op.iLike]: `%${filters.search}%` } },
      ];
    }

    const limit = filters.limit ? parseInt(filters.limit, 100) : 100;
    const offset = filters.offset ? parseInt(filters.offset, 100) : 0;

    const boards = await this.boardModel.findAll({
      where,
      limit,
      offset,
      order: [['updatedAt', 'DESC']],
    });
    return boards?.map((b) => b?.get({ plain: true }));
  }

  async getOne(id: string) {
    const board = await this.boardModel.findOne({ where: { id } });
    return board?.get({ plain: true });
  }

  async update(id: string, attrs: Partial<Board>) {
    await this.boardModel.update(attrs, { where: { id } });

    const board = await this.boardModel.findOne({ where: { id } });
    return board?.get({ plain: true });
  }

  async delete(id: string) {
    const board = await this.boardModel.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException('Board not found or not authorized');
    }
    await board.destroy();
  }

  async deleteAll(userId: string) {
    const boards = await this.boardModel.findAll({ where: { userId } });

    await Promise.all(boards.map((b) => b.destroy()));
  }
}
