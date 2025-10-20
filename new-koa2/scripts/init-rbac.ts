/**
 * RBAC权限管理系统初始化脚本
 * 创建默认角色、菜单和权限
 */

import { sequelize, models } from '../src/models';

async function initRBAC() {
  try {
    console.log('开始初始化RBAC权限管理系统...');

    // 1. 创建默认角色
    console.log('\n1. 创建默认角色...');
    const roles = await Promise.all([
      models.Role.findOrCreate({
        where: { code: 'super_admin' },
        defaults: {
          name: '超级管理员',
          code: 'super_admin',
          description: '系统超级管理员，拥有所有权限',
          status: 1
        }
      }),
      models.Role.findOrCreate({
        where: { code: 'admin' },
        defaults: {
          name: '管理员',
          code: 'admin',
          description: '系统管理员',
          status: 1
        }
      }),
      models.Role.findOrCreate({
        where: { code: 'user' },
        defaults: {
          name: '普通用户',
          code: 'user',
          description: '普通用户角色',
          status: 1
        }
      }),
      models.Role.findOrCreate({
        where: { code: 'guest' },
        defaults: {
          name: '访客',
          code: 'guest',
          description: '访客角色，只读权限',
          status: 1
        }
      })
    ]);

    console.log('✓ 角色创建完成');
    roles.forEach(([role, created]) => {
      console.log(
        `  - ${role.name} (${role.code}) ${created ? '[新建]' : '[已存在]'}`
      );
    });

    // 2. 创建默认菜单
    console.log('\n2. 创建默认菜单...');

    // 系统管理目录
    const [systemMenu] = await models.Menu.findOrCreate({
      where: { path: '/system' },
      defaults: {
        name: '系统管理',
        path: '/system',
        type: 'M',
        icon: 'setting',
        order: 1,
        status: 'active',
        parent_id: null,
        perms: 'system:view'
      }
    });

    // 用户管理菜单
    const [userMenu] = await models.Menu.findOrCreate({
      where: { path: '/system/user' },
      defaults: {
        name: '用户管理',
        path: '/system/user',
        type: 'C',
        component: 'system/user/index',
        icon: 'user',
        order: 1,
        status: 'active',
        parent_id: systemMenu.id,
        perms: 'system:user:view'
      }
    });

    // 用户管理按钮
    await models.Menu.findOrCreate({
      where: { perms: 'system:user:add' },
      defaults: {
        name: '添加用户',
        path: '',
        type: 'A',
        order: 1,
        status: 'active',
        parent_id: userMenu.id,
        perms: 'system:user:add'
      }
    });

    await models.Menu.findOrCreate({
      where: { perms: 'system:user:edit' },
      defaults: {
        name: '编辑用户',
        path: '',
        type: 'A',
        order: 2,
        status: 'active',
        parent_id: userMenu.id,
        perms: 'system:user:edit'
      }
    });

    await models.Menu.findOrCreate({
      where: { perms: 'system:user:delete' },
      defaults: {
        name: '删除用户',
        path: '',
        type: 'A',
        order: 3,
        status: 'active',
        parent_id: userMenu.id,
        perms: 'system:user:delete'
      }
    });

    // 角色管理菜单
    const [roleMenu] = await models.Menu.findOrCreate({
      where: { path: '/system/role' },
      defaults: {
        name: '角色管理',
        path: '/system/role',
        type: 'C',
        component: 'system/role/index',
        icon: 'team',
        order: 2,
        status: 'active',
        parent_id: systemMenu.id,
        perms: 'system:role:view'
      }
    });

    // 角色管理按钮
    await models.Menu.findOrCreate({
      where: { perms: 'system:role:add' },
      defaults: {
        name: '添加角色',
        path: '',
        type: 'A',
        order: 1,
        status: 'active',
        parent_id: roleMenu.id,
        perms: 'system:role:add'
      }
    });

    await models.Menu.findOrCreate({
      where: { perms: 'system:role:edit' },
      defaults: {
        name: '编辑角色',
        path: '',
        type: 'A',
        order: 2,
        status: 'active',
        parent_id: roleMenu.id,
        perms: 'system:role:edit'
      }
    });

    await models.Menu.findOrCreate({
      where: { perms: 'system:role:delete' },
      defaults: {
        name: '删除角色',
        path: '',
        type: 'A',
        order: 3,
        status: 'active',
        parent_id: roleMenu.id,
        perms: 'system:role:delete'
      }
    });

    await models.Menu.findOrCreate({
      where: { perms: 'system:role:assign' },
      defaults: {
        name: '分配权限',
        path: '',
        type: 'A',
        order: 4,
        status: 'active',
        parent_id: roleMenu.id,
        perms: 'system:role:assign'
      }
    });

    // 菜单管理
    const [menuMenu] = await models.Menu.findOrCreate({
      where: { path: '/system/menu' },
      defaults: {
        name: '菜单管理',
        path: '/system/menu',
        type: 'C',
        component: 'system/menu/index',
        icon: 'menu',
        order: 3,
        status: 'active',
        parent_id: systemMenu.id,
        perms: 'system:menu:view'
      }
    });

    // 菜单管理按钮
    await models.Menu.findOrCreate({
      where: { perms: 'system:menu:add' },
      defaults: {
        name: '添加菜单',
        path: '',
        type: 'A',
        order: 1,
        status: 'active',
        parent_id: menuMenu.id,
        perms: 'system:menu:add'
      }
    });

    await models.Menu.findOrCreate({
      where: { perms: 'system:menu:edit' },
      defaults: {
        name: '编辑菜单',
        path: '',
        type: 'A',
        order: 2,
        status: 'active',
        parent_id: menuMenu.id,
        perms: 'system:menu:edit'
      }
    });

    await models.Menu.findOrCreate({
      where: { perms: 'system:menu:delete' },
      defaults: {
        name: '删除菜单',
        path: '',
        type: 'A',
        order: 3,
        status: 'active',
        parent_id: menuMenu.id,
        perms: 'system:menu:delete'
      }
    });

    console.log('✓ 菜单创建完成');

    // 3. 为超级管理员分配所有菜单权限
    console.log('\n3. 为超级管理员分配权限...');
    const superAdminRole = roles[0][0];
    const allMenus = await models.Menu.findAll();

    if (superAdminRole.setMenus) {
      await superAdminRole.setMenus(allMenus.map((menu: any) => menu.id));
    }
    console.log(`✓ 已为超级管理员分配 ${allMenus.length} 个菜单权限`);

    // 4. 为管理员分配基本权限（除了系统管理外的所有权限）
    console.log('\n4. 为管理员分配权限...');
    const adminRole = roles[1][0];
    const adminMenus = allMenus.filter(
      (menu: any) => menu.perms && !menu.perms.startsWith('system:menu:')
    );

    if (adminRole.setMenus) {
      await adminRole.setMenus(adminMenus.map((menu: any) => menu.id));
    }
    console.log(`✓ 已为管理员分配 ${adminMenus.length} 个菜单权限`);

    // 5. 为普通用户分配只读权限
    console.log('\n5. 为普通用户分配权限...');
    const userRole = roles[2][0];
    const userMenus = allMenus.filter(
      (menu: any) => menu.perms && menu.perms.includes(':view')
    );

    if (userRole.setMenus) {
      await userRole.setMenus(userMenus.map((menu: any) => menu.id));
    }
    console.log(`✓ 已为普通用户分配 ${userMenus.length} 个菜单权限`);

    console.log('\n✅ RBAC权限管理系统初始化完成！');
    console.log('\n角色列表：');
    console.log('  - super_admin (超级管理员) - 拥有所有权限');
    console.log('  - admin (管理员) - 拥有除菜单管理外的所有权限');
    console.log('  - user (普通用户) - 只有查看权限');
    console.log('  - guest (访客) - 无权限');
  } catch (error) {
    console.error('❌ 初始化失败:', error);
    throw error;
  }
}

// 执行初始化
(async () => {
  try {
    await sequelize.authenticate();
    console.log('数据库连接成功');

    // 同步数据库表
    await sequelize.sync({ alter: true });
    console.log('数据库表同步完成');

    await initRBAC();

    await sequelize.close();
    console.log('\n数据库连接已关闭');
    process.exit(0);
  } catch (error) {
    console.error('执行失败:', error);
    process.exit(1);
  }
})();
