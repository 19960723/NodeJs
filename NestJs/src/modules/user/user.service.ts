import { Injectable, Logger } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UserRepository } from './repositories/user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { UserVo } from './dto/user.vo';
import { BusinessError } from '../../common/exceptions/business.exception';
import { HashUtil } from '../../common/utils/hash.util';

/**
 * User Service
 * 处理用户相关业务逻辑
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto): Promise<UserVo> {
    const { username, email, phone } = createUserDto;
    let { password } = createUserDto;

    // 如果未提供密码，默认使用用户名作为密码
    if (!password) {
      password = username;
    }

    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      BusinessError.conflict('用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      BusinessError.conflict('邮箱已被注册');
    }

    // 检查手机号是否已存在
    if (phone) {
      const existingPhone = await this.userRepository.findByPhone(phone);
      if (existingPhone) {
        BusinessError.conflict('手机号已被注册');
      }
    }

    // 加密密码
    const hashedPassword = await HashUtil.hashPassword(password);

    // 创建用户
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    this.logger.log(`创建用户成功: ${user.username}`);

    return this.toUserVo(user);
  }

  /**
   * 根据 ID 查询用户
   */
  async findById(id: number): Promise<UserVo> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      BusinessError.notFound('用户不存在');
    }
    return this.toUserVo(user);
  }

  /**
   * 分页查询用户列表
   */
  async findAll(queryUserDto: QueryUserDto) {
    const { username, email, phone, status, page, pageSize, keyword } =
      queryUserDto;

    // 构建查询条件
    const where: Prisma.UserWhereInput = {};

    if (username) {
      where.username = { contains: username };
    }

    if (email) {
      where.email = { contains: email };
    }

    if (phone) {
      where.phone = phone;
    }

    if (status !== undefined) {
      where.status = status;
    }
    if (keyword) {
      where.OR = [
        { username: { contains: keyword } },
        { email: { contains: keyword } },
        { name: { contains: keyword } },
        { nickname: { contains: keyword } },
      ];
    }

    // 查询数据
    const [users, total] = await Promise.all([
      this.userRepository.findMany({
        where,
        skip: (page! - 1) * pageSize!,
        take: pageSize!,
        orderBy: { createdAt: 'desc' },
      }),
      this.userRepository.count(where),
    ]);

    return {
      list: users.map((user) => this.toUserVo(user)),
      total,
      page: page!,
      pageSize: pageSize!,
      totalPages: Math.ceil(total / pageSize!),
    };
  }

  /**
   * 更新用户
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserVo> {
    // 检查用户是否存在
    const user = await this.userRepository.findById(id);
    if (!user) {
      BusinessError.notFound('用户不存在');
    }
    console.log('updateUserDto', updateUserDto);

    // 如果更新邮箱，检查是否已被其他用户使用
    if (updateUserDto.email) {
      const existingEmail = await this.userRepository.findByEmail(
        updateUserDto.email,
      );
      if (existingEmail && existingEmail.id !== id) {
        BusinessError.conflict('邮箱已被其他用户使用');
      }
    }

    // 如果更新手机号，检查是否已被其他用户使用
    if (updateUserDto.phone) {
      const existingPhone = await this.userRepository.findByPhone(
        updateUserDto.phone,
      );
      if (existingPhone && existingPhone.id !== id) {
        BusinessError.conflict('手机号已被其他用户使用');
      }
    }

    // 更新用户
    const updatedUser = await this.userRepository.update(id, updateUserDto);

    this.logger.log(`更新用户成功: ${updatedUser.username}`);

    return this.toUserVo(updatedUser);
  }

  /**
   * 删除用户
   */
  async remove(id: number): Promise<void> {
    // 检查用户是否存在
    const user = await this.userRepository.findById(id);
    if (!user) {
      BusinessError.notFound('用户不存在');
    }

    await this.userRepository.delete(id);

    this.logger.log(`删除用户成功: ${user.username}`);
  }

  /**
   * 转换为 UserVo（隐藏敏感信息）
   */
  private toUserVo(user: User): UserVo {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userVo } = user;
    return userVo as UserVo;
  }
}
