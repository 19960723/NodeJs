import { requestClient } from '#/api/request';

export namespace SysApi {
  export interface SysDict {
    id: number;
    name: string;
    code: string;
    description: string;
    status: number;
  }
}

export async function getDictListApi(params: any) {
  return requestClient.get<SysApi.SysDict[]>('/sys/dict', { params });
}
export async function createDictApi(data: any) {
  return requestClient.post<SysApi.SysDict>('/sys/dict', data);
}
export async function updateDictApi(id: number, data: any) {
  return requestClient.put<SysApi.SysDict>(`/sys/dict/${id}`, data);
}
export async function deleteDictApi(id: number) {
  return requestClient.delete<SysApi.SysDict>(`/sys/dict/${id}`);
}
