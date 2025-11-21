import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * 权限种子数据
 */
export const permissionsSeed = [
  // 用户管理权限
  {
    name: '创建用户',
    code: 'user:create',
    resource: 'user',
    action: 'create',
    description: '创建新用户',
  },
  {
    name: '查看用户',
    code: 'user:read',
    resource: 'user',
    action: 'read',
    description: '查看用户详情',
  },
  {
    name: '更新用户',
    code: 'user:update',
    resource: 'user',
    action: 'update',
    description: '更新用户信息',
  },
  {
    name: '删除用户',
    code: 'user:delete',
    resource: 'user',
    action: 'delete',
    description: '删除用户',
  },
  {
    name: '用户列表',
    code: 'user:list',
    resource: 'user',
    action: 'list',
    description: '查看用户列表',
  },

  // 角色管理权限
  {
    name: '创建角色',
    code: 'role:create',
    resource: 'role',
    action: 'create',
    description: '创建新角色',
  },
  {
    name: '查看角色',
    code: 'role:read',
    resource: 'role',
    action: 'read',
    description: '查看角色详情',
  },
  {
    name: '更新角色',
    code: 'role:update',
    resource: 'role',
    action: 'update',
    description: '更新角色信息',
  },
  {
    name: '删除角色',
    code: 'role:delete',
    resource: 'role',
    action: 'delete',
    description: '删除角色',
  },
  {
    name: '角色列表',
    code: 'role:list',
    resource: 'role',
    action: 'list',
    description: '查看角色列表',
  },
  {
    name: '分配权限',
    code: 'role:assign-permissions',
    resource: 'role',
    action: 'assign-permissions',
    description: '为角色分配权限',
  },

  // 权限管理权限
  {
    name: '创建权限',
    code: 'permission:create',
    resource: 'permission',
    action: 'create',
    description: '创建新权限',
  },
  {
    name: '查看权限',
    code: 'permission:read',
    resource: 'permission',
    action: 'read',
    description: '查看权限详情',
  },
  {
    name: '更新权限',
    code: 'permission:update',
    resource: 'permission',
    action: 'update',
    description: '更新权限信息',
  },
  {
    name: '删除权限',
    code: 'permission:delete',
    resource: 'permission',
    action: 'delete',
    description: '删除权限',
  },
  {
    name: '权限列表',
    code: 'permission:list',
    resource: 'permission',
    action: 'list',
    description: '查看权限列表',
  },

  // 文章管理权限
  {
    name: '创建文章',
    code: 'article:create',
    resource: 'article',
    action: 'create',
    description: '创建新文章',
  },
  {
    name: '查看文章',
    code: 'article:read',
    resource: 'article',
    action: 'read',
    description: '查看文章详情',
  },
  {
    name: '更新文章',
    code: 'article:update',
    resource: 'article',
    action: 'update',
    description: '更新文章内容',
  },
  {
    name: '删除文章',
    code: 'article:delete',
    resource: 'article',
    action: 'delete',
    description: '删除文章',
  },
  {
    name: '文章列表',
    code: 'article:list',
    resource: 'article',
    action: 'list',
    description: '查看文章列表',
  },
  {
    name: '发布文章',
    code: 'article:publish',
    resource: 'article',
    action: 'publish',
    description: '发布文章',
  },

  // 分类管理权限
  {
    name: '创建分类',
    code: 'category:create',
    resource: 'category',
    action: 'create',
    description: '创建新分类',
  },
  {
    name: '查看分类',
    code: 'category:read',
    resource: 'category',
    action: 'read',
    description: '查看分类详情',
  },
  {
    name: '更新分类',
    code: 'category:update',
    resource: 'category',
    action: 'update',
    description: '更新分类信息',
  },
  {
    name: '删除分类',
    code: 'category:delete',
    resource: 'category',
    action: 'delete',
    description: '删除分类',
  },
  {
    name: '分类列表',
    code: 'category:list',
    resource: 'category',
    action: 'list',
    description: '查看分类列表',
  },
];

/**
 * 初始化权限数据
 */
export async function seedPermissions() {
  console.log('🌱 开始初始化权限数据...');

  try {
    const result = await prisma.permission.createMany({
      data: permissionsSeed,
      skipDuplicates: true,
    });

    console.log(`✅ 成功创建 ${result.count} 个权限`);
  } catch (error) {
    console.error('❌ 权限数据初始化失败:', error);
    throw error;
  }
}
