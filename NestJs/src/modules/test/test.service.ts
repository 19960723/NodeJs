import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getTestInfo() {
    return {
      id: 1,
      name: 'Test',
      description: 'Test Description',
    };
  }

  getTestList() {
    return [
      {
        id: 1,
        name: 'Test',
        description: 'Test Description',
      },
      {
        id: 2,
        name: 'Test2',
        description: 'Test2 Description',
      },
      {
        id: 3,
        name: 'Test3',
        description: 'Test3 Description',
      },
    ];
  }

  createTest() {
    return {
      id: 1,
      name: 'Test',
      description: 'Test Description',
    };
  }

  updateTest(id: string) {
    console.log(id);
    return {
      id: 1,
      name: 'Test',
      description: `${id} Test Description`,
    };
  }

  deleteTest(id: string) {
    return {
      id: 1,
      name: 'Test',
      description: `${id} Test Description`,
    };
  }
}
