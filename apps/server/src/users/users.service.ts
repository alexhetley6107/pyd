import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from './users.providers';
import { BoardService } from 'src/board/board.service';
import { TaskService } from 'src/task/task.service';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { UserInfo } from './dto/user-info';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: typeof User,
    private boardService: BoardService,
    private taskService: TaskService
  ) {}

  async create(dto: CreateUserDto) {
    const userModel = await this.userRepository.create(dto);
    const user = userModel?.get({ plain: true });

    return user;
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    return user?.get({ plain: true });
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user?.get({ plain: true });
  }

  async findByNickname(nickname: string) {
    const user = await this.userRepository.findOne({ where: { nickname } });
    return user?.get({ plain: true });
  }

  async findByResetToken(token: string) {
    const user = await this.userRepository.findOne({ where: { resetToken: token } });
    return user?.get({ plain: true });
  }

  async update(id: string, attrs: Partial<User>): Promise<void> {
    await this.userRepository.update(attrs, { where: { id } });
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    await this.boardService.deleteAll(id);
    await this.taskService.deleteAll(id);

    await user.destroy();
  }

  async updatePhoto(id: string, filename: string): Promise<UserInfo> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (user.photo) {
      try {
        await unlink(join(process.cwd(), 'images', user.photo));
      } catch (e) {
        console.log('Old photo not found');
      }
    }

    const photo = `${process.env.BASE_URL}/images/${filename}`;

    await this.update(id, { photo });

    return {
      email: user.email,
      nickname: user.nickname,
      photo,
    };
  }
}
