import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMsg(): string {
    return 'EasyGenerator';
  }
}
