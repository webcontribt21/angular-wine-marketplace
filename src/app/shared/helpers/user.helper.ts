import {UserDetailDto} from '../../user/common/dto';

import * as jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';

export class UserHelper {

  static getUserId(): UserDetailDto | null {
    const token = localStorage.getItem('token');
    if (token) {
      const data = jwt_decode(token);
      const userDetail: UserDetailDto = {
        id: data.id.toString(),
      };

      return userDetail;
    }

    return null;
  }

  static getTokenData() {
    const token = localStorage.getItem('token');
    if (token) {
      const data = jwt_decode(token);
      return data;
    }
    return null;
  }

  static getShopTokenData(): { id: string } {
    const token = environment.shopToken;
    if (token) {
      const data = jwt_decode(token);
      return data;
    }
    return null;
  }

  static getTimeUpdateToken(): number {
    const token = localStorage.getItem('token');

    if (token) {
      const data = jwt_decode(token);
    }

    return 5000 * 60;
  }

  static hasTokenExpired(decoded): boolean {
    const now = Date.now().valueOf() / 1000;
    if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
        return true;
    }
    if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
      return true;
    }
    return false;
  }
}
