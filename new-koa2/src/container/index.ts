/**
 * 简单的依赖注入容器
 */
class Container {
  private services = new Map<string, any>();
  private singletons = new Map<string, any>();

  /**
   * 注册服务
   */
  register<T>(name: string, factory: () => T, singleton: boolean = false): void {
    this.services.set(name, { factory, singleton });
  }

  /**
   * 获取服务
   */
  get<T>(name: string): T {
    const service = this.services.get(name);
    
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }

    if (service.singleton) {
      if (!this.singletons.has(name)) {
        this.singletons.set(name, service.factory());
      }
      return this.singletons.get(name);
    }

    return service.factory();
  }

  /**
   * 检查服务是否存在
   */
  has(name: string): boolean {
    return this.services.has(name);
  }

  /**
   * 清除所有服务
   */
  clear(): void {
    this.services.clear();
    this.singletons.clear();
  }
}

// 创建全局容器实例
export const container = new Container();

// 服务名称常量
export const SERVICE_NAMES = {
  EXAMPLE_SERVICE: 'ExampleService',
  EXAMPLE_REPOSITORY: 'ExampleRepository',
  LOGGER: 'Logger',
  DATABASE: 'Database'
} as const;
