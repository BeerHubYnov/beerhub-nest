import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(
    @Body()
    registerDto: CreateUserDto,
  ) {
    return this.authService.register(registerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.logout(token);
  }
}
