// Services
import { ApiService } from '../../services';
// Api
import { BASE_URL } from '../../../api/api';

const url = `${BASE_URL}/auth`;

export const AuthPostEndpointsC = {
  login: (apiService: ApiService, payload: LoginPayloadI) =>
    apiService.onPost({
      url: `${url}/login`,
      body: payload,
    }),
};

interface LoginPayloadI {
  email: string;
  password: string;
}
