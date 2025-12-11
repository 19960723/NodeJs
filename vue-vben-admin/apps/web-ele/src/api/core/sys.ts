import { requestClient } from '#/api/request';

export namespace SysApi {
  export interface SysDict {
    id: number;
    name: string;
    code: string;
    description: string;
    status: number;
  }
  export interface SysDictData {
    id: number;
    name: string;
    value: string;
    description: string;
    status: number;
    dict_id?: number;
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

export async function getDictDataListApi(dictId: number, params: any) {
  return requestClient.get<SysApi.SysDictData[]>(`/sys/dict/${dictId}/items`, {
    params,
  });
}
export async function createDictDataApi(dictId: number, data: any) {
  return requestClient.post<SysApi.SysDictData>(
    `/sys/dict/${dictId}/items`,
    data,
  );
}
export async function updateDictDataApi(
  dictId: number,
  itemId: number,
  data: any,
) {
  return requestClient.put<SysApi.SysDictData>(
    `/sys/dict/${dictId}/items/${itemId}`,
    data,
  );
}
export async function deleteDictDataApi(id: number, itemId: number) {
  return requestClient.delete<SysApi.SysDictData>(
    `/sys/dict/${id}/items/${itemId}`,
  );
}
