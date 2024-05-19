import {
  Injectable,
  UnauthorizedException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../user/interfaces/user.interface';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const newUser = await this.userService.createUser(createUserDto);
    return this.createToken(newUser);
  }

  async signin(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userService.getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      this.logger.error(`Invalid login attempt for user ${email}`);
      throw new UnauthorizedException('Invalid credentials!');
    }
    this.logger.log(`User with ${user._id} signed in successfully`);
    return this.createToken(user);
  }

  private async createToken(user: User) {
    const payload: JwtPayload = { _id: user._id.toString() };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('jwtExpiresIn'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('jwtRefreshExpiresIn'),
    });
    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwtSecret'),
      });
      const user = await this.userService.getUserById(payload._id);
      if (!user) {
        this.logger.error('User not found during token refresh');
        throw new NotFoundException('User not found!');
      }
      this.logger.log(`User ${user._id} refreshed token successfully`);
      return this.createToken(user);
    } catch (e) {
      this.logger.error('Invalid refresh token', e.stack);
      throw new UnauthorizedException('Invalid refresh token!');
    }
  }
}
