import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { MailService } from 'src/mail/mail.service';
import { Response } from 'express';
import { UserInfo } from 'src/users/dto/user-info';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  generateTokens(id: string, email: string) {
    const payload = { id, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  setTokenCookies(res: Response, accessToken: string, refreshToken: string) {
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  }

  async login(res: Response, dto: LoginDto): Promise<UserInfo> {
    const user = await this.validateUser(dto);

    const { accessToken, refreshToken } = this.generateTokens(user.id, user.email);
    this.setTokenCookies(res, accessToken, refreshToken);

    return {
      email: user.email,
      nickname: user.nickname,
      photo: user.photo,
    };
  }

  async signup(res: Response, dto: CreateUserDto): Promise<UserInfo> {
    let candidate = await this.userService.findByNickname(dto.nickname);
    if (candidate) {
      throw new HttpException('User with this username already exists', HttpStatus.BAD_REQUEST);
    }
    candidate = await this.userService.findByEmail(dto.email);
    if (candidate) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const createdUser = await this.userService.create({
      ...dto,
      password: hashPassword,
    });

    const { accessToken, refreshToken } = this.generateTokens(createdUser.id, createdUser.email);
    this.setTokenCookies(res, accessToken, refreshToken);

    return {
      email: createdUser.email,
      nickname: createdUser.nickname,
      photo: createdUser.photo,
    };
  }

  async refresh(res: Response, token: string) {
    const payload = this.jwtService.decode(token) as {
      id: string;
      email: string;
    };
    const { accessToken, refreshToken } = this.generateTokens(payload.id, payload.email);
    this.setTokenCookies(res, accessToken, refreshToken);
  }

  logout(res: Response) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
  }

  async validateUser(dto: LoginDto) {
    let candidate = await this.userService.findByNickname(dto.login);

    if (!candidate) {
      candidate = await this.userService.findByEmail(dto.login);
    }

    const passwordMatch = await bcrypt.compare(dto.password, candidate?.password ?? '');
    if (!candidate || !passwordMatch) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    const user = {
      id: candidate.id,
      email: candidate.email,
      nickname: candidate.nickname,
      photo: candidate.photo,
    };

    return user;
  }

  async getMe(id: string): Promise<UserInfo> {
    const user = await this.userService.findById(id);
    if (!user) throw new UnauthorizedException('User not found');

    return {
      email: user.email,
      nickname: user.nickname,
      photo: user.photo,
    };
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException('Such email not found', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({ userId: user.id }, { expiresIn: '1h' });

    await this.userService.update(user.id, {
      resetToken: token,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
    });

    await this.mailService.sendResetPassword(email, token);
  }

  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    if (!token) {
      throw new BadRequestException('Token is required');
    }

    const user = await this.userService.findByResetToken(token);

    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    if (user.resetTokenExpiry && user.resetTokenExpiry < new Date()) {
      throw new BadRequestException('Token expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.userService.update(user.id, {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return { message: 'Password has been reset successfully' };
  }
}
