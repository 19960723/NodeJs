import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserInfo() {
    return {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    };
  }
}
