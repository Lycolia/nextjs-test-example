import { HttpClient } from '../../utils/http-client';

type UserResponse = {
  hoge: number;
};

export const getUserRequest = async (userId: string) => {
  const htcli = new HttpClient('https://example.com', { hoge: 'piyo' });
  return htcli.get<UserResponse>('/user', { id: userId });
};
