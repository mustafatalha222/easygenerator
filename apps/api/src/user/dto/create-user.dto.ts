import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Random Name' })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @ApiProperty({ example: 'test@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'P@ssw0rd!' })
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Matches(/(?=.*[A-Za-z])/, {
    message: 'password must contain at least 1 letter',
  })
  @Matches(/(?=.*\d)/, { message: 'password must contain at least 1 number' })
  @Matches(/(?=.*[@$!%*?&])/, {
    message: 'password must contain at least 1 special character',
  })
  password: string;
}
