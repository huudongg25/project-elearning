import { PrivateAxios } from "../configs/axios.config";

class Api {
  async Post(endpoint: string, data: any) {
    return await PrivateAxios.post(endpoint, data);
  }
  async PostId(endpoint: string, id: number, data: any) {
    return await PrivateAxios.post(`${endpoint}/${id}`, data);
  }
  async Get(endpoint: string) {
    return await PrivateAxios.get(endpoint);
  }
  async Patch(endpoint: string, id: number, data: any) {
    return await PrivateAxios.patch(`${endpoint}/${id}`, data);
  }
  async Delete(endpoint: string, id: number) {
    return await PrivateAxios.delete(`${endpoint}/${id}`);
  }
  async LogOut(endpoint: string) {
    await PrivateAxios.get(endpoint);
  }
  async GetById(endpoint: string, id?: number, data?: any) {
    if (data) {
      return await PrivateAxios.get(`${endpoint}/${id}`, {
        params: { code: data },
      });
    } else {
      return await PrivateAxios.get(`${endpoint}/${id}`);
    }
  }
  async Search(endpoint: string, searchValue: string, id?: number) {
    if (id) {
      return await PrivateAxios.get(`${endpoint}/${id}`, {
        params: { search: searchValue },
      });
    } else {
      return await PrivateAxios.get(endpoint, {
        params: { search: searchValue },
      });
    }
  }
  async CreatePass(endpoint: string, password: string) {
    return await PrivateAxios.patch(endpoint, { password });
  }
  async CreateOtp(endpoint: string, email: any) {
    return await PrivateAxios.post(endpoint, { email });
  }
}
export default Api;
