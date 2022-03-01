import { User } from '../@types/user';
import { LoginForm } from 'utils/sigin';
import { WrapperService } from './wrapper';
import { getTokenCookie } from 'utils/jwt';

export class AuthService {
  public apiService: WrapperService = new WrapperService();

  public login(formData: LoginForm) {
    let apiParam = {
      method: 'POST',
      body: formData,
      url: `/auth/login`
    };
    return this.apiService.httpCall(apiParam);
  }

  get roleId(): number {
    return this.userInfo.userRoleId || 0;
  }

  get ownerData() {
    return this.userInfo.Owner;
  }

  get boostGroupData() {
    return this.userInfo.BoostGroup;
  }

  get authHeader() {
    let token = this.token;
    if (token) {
      return { Authorization: 'Bearer ' + token };
    } else {
      return {};
    }
  }

  get token(): string {
    const token = getTokenCookie();
    if (token) {
      return token;
    } else {
      return '';
    }
  }

  get userInfo(): User {
    return JSON.parse(localStorage.getItem('UserInfo') || '{}');
  }
}
