module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();

    // 插入角色数据
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        name: '超级管理员',
        code: 'admin',
        description: '系统超级管理员，拥有所有权限',
        status: 'active',
        sort: 1,
        isSystem: true,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 2,
        name: '普通用户',
        code: 'user',
        description: '普通用户，拥有基础权限',
        status: 'active',
        sort: 2,
        isSystem: true,
        createdAt: now,
        updatedAt: now
      }
    ]);

    // 插入路由数据
    await queryInterface.bulkInsert('routes', [
      // 仪表盘
      {
        id: 1,
        name: 'Dashboard',
        path: '/dashboard',
        component: 'Dashboard',
        title: '仪表盘',
        icon: 'Dashboard',
        parentId: null,
        sort: 1,
        hidden: false,
        keepAlive: true,
        status: 'active',
        type: 'menu',
        permission: 'dashboard:view',
        description: '系统仪表盘',
        createdAt: now,
        updatedAt: now
      },

      // 用户管理
      {
        id: 2,
        name: 'UserManagement',
        path: '/user',
        component: 'BasicLayout',
        title: '用户管理',
        icon: 'User',
        parentId: null,
        sort: 2,
        hidden: false,
        keepAlive: false,
        status: 'active',
        type: 'menu',
        permission: null,
        description: '用户管理模块',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 3,
        name: 'UserList',
        path: '/user',
        component: 'User/UserList',
        title: '用户列表',
        icon: null,
        parentId: 2,
        sort: 1,
        hidden: false,
        keepAlive: true,
        status: 'active',
        type: 'menu',
        permission: 'user:view',
        description: '用户列表页面',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 4,
        name: 'UserCreate',
        path: '/user/create',
        component: 'User/UserForm',
        title: '新增用户',
        icon: null,
        parentId: 2,
        sort: 2,
        hidden: true,
        keepAlive: false,
        status: 'active',
        type: 'menu',
        permission: 'user:create',
        description: '新增用户页面',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 5,
        name: 'UserEdit',
        path: '/user/edit/:id',
        component: 'User/UserForm',
        title: '编辑用户',
        icon: null,
        parentId: 2,
        sort: 3,
        hidden: true,
        keepAlive: false,
        status: 'active',
        type: 'menu',
        permission: 'user:update',
        description: '编辑用户页面',
        createdAt: now,
        updatedAt: now
      },

      // 系统管理
      {
        id: 6,
        name: 'SystemManagement',
        path: '/system',
        component: 'BasicLayout',
        title: '系统管理',
        icon: 'Setting',
        parentId: null,
        sort: 3,
        hidden: false,
        keepAlive: false,
        status: 'active',
        type: 'menu',
        permission: null,
        description: '系统管理模块',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 7,
        name: 'RoleManagement',
        path: '/system/role',
        component: 'System/RoleList',
        title: '角色管理',
        icon: 'UserFilled',
        parentId: 6,
        sort: 1,
        hidden: false,
        keepAlive: true,
        status: 'active',
        type: 'menu',
        permission: 'role:view',
        description: '角色管理页面',
        createdAt: now,
        updatedAt: now
      },
      {
        id: 8,
        name: 'RouteManagement',
        path: '/system/route',
        component: 'System/RouteList',
        title: '路由管理',
        icon: 'Menu',
        parentId: 6,
        sort: 2,
        hidden: false,
        keepAlive: true,
        status: 'active',
        type: 'menu',
        permission: 'route:view',
        description: '路由管理页面',
        createdAt: now,
        updatedAt: now
      }
    ]);

    // 为超级管理员分配所有路由权限
    const routeIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const adminRoleRoutes = routeIds.map(routeId => ({
      roleId: 1,
      routeId: routeId,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('RoleRoutes', adminRoleRoutes);

    // 为普通用户分配基础权限
    const userRoleRoutes = [1, 2, 3].map(routeId => ({
      roleId: 2,
      routeId: routeId,
      createdAt: now,
      updatedAt: now
    }));

    await queryInterface.bulkInsert('RoleRoutes', userRoleRoutes);

    // 为现有用户分配默认角色（假设用户ID为1的是管理员）
    try {
      // 检查是否有用户存在
      const users = await queryInterface.sequelize.query(
        'SELECT id FROM users LIMIT 1',
        { type: Sequelize.QueryTypes.SELECT }
      );

      if (users.length > 0) {
        // 为第一个用户分配管理员角色
        await queryInterface.bulkInsert('UserRoles', [
          {
            userId: users[0].id,
            roleId: 1,
            createdAt: now,
            updatedAt: now
          }
        ]);
      }
    } catch (error) {
      console.log('用户表不存在或为空，跳过用户角色分配');
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RoleRoutes', null, {});
    await queryInterface.bulkDelete('UserRoles', null, {});
    await queryInterface.bulkDelete('routes', null, {});
    await queryInterface.bulkDelete('roles', null, {});
  }
};
