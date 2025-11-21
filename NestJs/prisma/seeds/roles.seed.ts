import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 角色种子数据
 */
export const rolesSeed = [
  {
    name: '超级管理员',
    code: 'admin',
    description: '拥有所有权限的超级管理员',
    status: 1,
  },
  {
    name: '编辑',
    code: 'editor',
    description: '可以管理文章和分类',
    status: 1,
  },
  {
    name: '作者',
    code: 'author',
    description: '可以创建和管理自己的文章',
    status: 1,
  },
  {
    name: '访客',
    code: 'guest',
    description: '只能查看内容',
    status: 1,
  },
];

/**
 * 角色权限映射
 */
export const rolePermissionsMap = {
  admin: [
    // 拥有所有权限
    'user:create',
    'user:read',
    'user:update',
    'user:delete',
    'user:list',
    'role:create',
    'role:read',
    'role:update',
    'role:delete',
    'role:list',
    'role:assign-permissions',
    'permission:create',
    'permission:read',
    'permission:update',
    'permission:delete',
    'permission:list',
    'article:create',
    'article:read',
    'article:update',
    'article:delete',
    'article:list',
    'article:publish',
    'category:create',
    'category:read',
    'category:update',
    'category:delete',
    'category:list',
  ],
  editor: [
    // 文章和分类管理
    'article:create',
    'article:read',
    'article:update',
    'article:delete',
    'article:list',
    'article:publish',
    'category:create',
    'category:read',
    'category:update',
    'category:delete',
    'category:list',
  ],
  author: [
    // 创建和查看文章
    'article:create',
    'article:read',
    'article:update',
    'article:list',
    'category:read',
    'category:list',
  ],
  guest: [
    // 只能查看
    'article:read',
    'article:list',
    'category:read',
    'category:list',
  ],
};

/**
 * 初始化角色数据
 */
export async function seedRoles() {
  console.log('🌱 开始初始化角色数据...');

  try {
    // 创建角色
    const createdRoles: Role[] = [];
    for (const roleData of rolesSeed) {
      const role = await prisma.role.upsert({
        where: { code: roleData.code },
        update: {},
        create: roleData,
      });
      createdRoles.push(role);
      console.log(`✅ 角色 "${role.name}" 创建/更新成功`);
    }

    // 分配权限
    console.log('\n🔗 开始分配角色权限...');
    for (const role of createdRoles) {
      const permissionCodes =
        rolePermissionsMap[role.code as keyof typeof rolePermissionsMap];

      if (!permissionCodes) continue;

      // 查询权限 ID
      const permissions = await prisma.permission.findMany({
        where: {
          code: { in: permissionCodes },
        },
      });

      // 删除旧的权限关联
      await prisma.rolePermission.deleteMany({
        where: { roleId: role.id },
      });

      // 创建新的权限关联
      const rolePermissions = permissions.map((permission) => ({
        roleId: role.id,
        permissionId: permission.id,
      }));

      await prisma.rolePermission.createMany({
        data: rolePermissions,
        skipDuplicates: true,
      });

      console.log(`✅ 角色 "${role.name}" 分配了 ${permissions.length} 个权限`);
    }

    console.log('\n✅ 角色数据初始化完成');
  } catch (error) {
    console.error('❌ 角色数据初始化失败:', error);
    throw error;
  }
}
