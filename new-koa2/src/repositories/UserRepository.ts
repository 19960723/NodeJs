import { BaseRepository } from './BaseRepository';
import models from '../models';

export class UserRepository extends BaseRepository<any> {
  constructor() {
    super((models as any)['User'] as any);
  }

  async findByUsername(username: string): Promise<any | null> {
    return await this.model.findOne({ where: { username } });
  }
  override async create(data: any): Promise<any> {
    // 对用户密码进行加密处理（如果有密码字段）
    if (data.password) {
      const bcrypt = require('bcryptjs');
      const saltRounds = 10;
      data.password = await bcrypt.hash(data.password, saltRounds);
    }
    return await this.model.create(data);
  }
}

export default UserRepository;
