import { axiosInstance } from './AxiosInstance';
export const AxiosInsert = async (url: string, body: any): Promise<any> => {
  let response: any;
  response = await axiosInstance.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  response = await response.data;
  return response;
};

export const AxiosUpdate = async (url: string, body: any): Promise<any> => {
  let response: any;
  response = await axiosInstance.patch(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  response = await response.data;
  return response;
};

export const AxiosGet = async (url: string): Promise<any> => {
  let response: any;
  response = await axiosInstance.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  response = await response.data;
  return response;
};
