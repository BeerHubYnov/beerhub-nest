import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly revokedTokens: Set<string> = new Set();

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: LoginDto): Promise<{ userId: string, access_token: string }> {
    const foundUser = await this.userService.findByUsername(user.username);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(
      user.password,
      foundUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload = { username: user.username, userId: foundUser.id };
    return {
      userId: foundUser.id,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    user: CreateUserDto,
  ): Promise<{ message: string; user: CreateUserDto }> {
    const existingUser = await this.userService.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }
    if (await this.userService.findByUsername(user.username)) {
      throw new ConflictException('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this.userService.create({
      ...user,
      password: hashedPassword,
    });
    return {
      message: 'User successfully registered',
      user: {
        username: createdUser.username,
      } as CreateUserDto,
    };
  }
}
