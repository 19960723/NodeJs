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
    return await this.model.create(data);
  }
}

export default UserRepository;
