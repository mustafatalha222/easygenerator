import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  private readonly logger = new Logger(UserService.name);

  async getUserById(_id: string) {
    const user = await this.userModel.findById(_id).select('-password');
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.getUserByEmail(email);
    if (user) {
      this.logger.warn('signup - user already exist');
      throw new ConflictException('User already Exist!');
    }

    const hashedPassword = await this.hashPassword(createUserDto.password);
    console.log(`hashedPassword`);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    await newUser.save();
    this.logger.log(`User ${newUser._id} signed up successfully`);
    return newUser;
  }

  private async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
}
