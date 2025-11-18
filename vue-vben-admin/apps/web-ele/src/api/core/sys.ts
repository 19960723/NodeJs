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
  return requestClient.get<SysApi.SysDictData[]>(
    `/sys/dict-data/list/${dictId}`,
    {
      params,
    },
  );
}
export async function getDictDataByIdApi(id: number) {
  return requestClient.get<SysApi.SysDictData>(`/sys/dict-data/${id}`);
}
export async function createDictDataApi(data: any) {
  return requestClient.post<SysApi.SysDictData>(`/sys/dict-data`, data);
}
export async function updateDictDataApi(id: number, data: any) {
  return requestClient.put<SysApi.SysDictData>(`/sys/dict-data/${id}`, data);
}
export async function deleteDictDataApi(id: number) {
  return requestClient.delete<SysApi.SysDictData>(`/sys/dict-data/${id}`);
}
