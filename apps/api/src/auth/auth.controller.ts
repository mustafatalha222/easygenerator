import { Controller, Post, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Sign in' })
  @Post('signin')
  async signin(@Body() loginUserDto: LoginUserDto) {
    this.logger.log(`Signin request for email: ${loginUserDto.email}`);
    return this.authService.signin(loginUserDto);
  }

  @ApiOperation({ summary: 'Sign up' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Signup request for email: ${createUserDto.email}`);
    return this.authService.signup(createUserDto);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @Post('refresh_token')
  async refreshToken(@Body() obj: RefreshTokenDto) {
    this.logger.log('Refresh token request');
    return this.authService.refreshToken(obj.refreshToken);
  }
}
