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

  async validateUser(
    username: string,
    pass: string,
  ): Promise<CreateUserDto | null> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
      return {
        userId: Number(user.id),
        email: user.email,
        username: user.username,
        password: user.password,
      } as unknown as CreateUserDto;
    }
    return null;
  }

  async login(user: LoginDto): Promise<{ access_token: string }> {
    const foundUser = await this.userService.findByUsername(user.username);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    if (foundUser.password !== user.password) {
      throw new UnauthorizedException('Incorrect password');
    }
    const payload = { username: user.username, sub: foundUser.id };
    return {
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

  async logout(token: string): Promise<void> {
    this.revokedTokens.add(token);
  }
}
