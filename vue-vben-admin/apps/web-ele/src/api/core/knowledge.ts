import { requestClient } from '../request';

export namespace KnowledgeApi {
  export interface VideoClass {
    id: number;
    name: string;
    description: string;
    status: number;
    createTime?: string;
    updateTime?: string;
  }
}

export async function getVideoClassListApi(params: any) {
  return requestClient.get<KnowledgeApi.VideoClass[]>('/video/class', {
    params,
  });
}

export async function createVideoClassApi(data: any) {
  return requestClient.post<KnowledgeApi.VideoClass>('/video/class', data);
}

export async function updateVideoClassApi(id: number, data: any) {
  return requestClient.put<KnowledgeApi.VideoClass>(`/video/class/${id}`, data);
}

export async function deleteVideoClassApi(id: number) {
  return requestClient.delete<KnowledgeApi.VideoClass>(`/video/class/${id}`);
}
