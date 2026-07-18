import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.model';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request, Response } from 'express';
import { JwtRefreshGuard } from 'src/jwt-app/guard/jwt-refresh.guard';
import { JwtAccessGuard } from 'src/jwt-app/guard/jwt-access.guard';
import { RequestWithUser } from 'src/jwt-app/types/requestWithUser';
import { JwtGetMeGuard } from 'src/jwt-app/guard/jwt-get-me.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 200, type: User })
  @Post('signup')
  async signup(@Res({ passthrough: true }) res: Response, @Body() dto: CreateUserDto) {
    return this.authService.signup(res, dto);
  }

  @ApiOperation({ summary: 'User Authorization' })
  @ApiResponse({ status: 200, type: User })
  @Post('login')
  async login(@Res({ passthrough: true }) res: Response, @Body() dto: LoginDto) {
    return this.authService.login(res, dto);
  }

  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: 'Refresh token' })
  @Post('refresh')
  refresh(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies['refresh_token'];
    return this.authService.refresh(res, token);
  }

  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Logging out' })
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @ApiOperation({ summary: 'User Forgot password' })
  @ApiResponse({ status: 200 })
  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @ApiOperation({ summary: 'User Reset password' })
  @ApiResponse({ status: 200 })
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const { token, newPassword } = dto;
    return this.authService.resetPassword(token, newPassword);
  }

  @UseGuards(JwtAccessGuard)
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ status: 200 })
  @Get('me')
  async getMe(@Req() req: RequestWithUser) {
    if (!req.user) return null;
    return this.authService.getMe(req.user.id);
  }
}
