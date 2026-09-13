// Environments
import { enviroment } from '@environments';

export const GetTokenU = ({ key }: PayloadI) => {
  return window.localStorage.getItem(key ?? enviroment.tokenKey);
};

export const SetTokenU = ({ key, value }: SetTokenI) => {
  return window.localStorage.setItem(key ?? enviroment.tokenKey, value);
};

interface PayloadI {
  key?: string | undefined | null;
}

interface SetTokenI extends PayloadI {
  value: string;
}
