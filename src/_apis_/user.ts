// utils
import { WrapperService } from './wrapper';
import { environment } from './environment';
// utils

import { BoostGroupsInterface } from '../@types/boost';
import { UserInterface } from '../@types/user';

// ----------------------------------------------------------------------

export class UserService {
  public apiService: WrapperService = new WrapperService();

  private requestTimeout = 0; //no timeout;

  private responseEncoding = 'utf8';

  private baseURL = environment.base_url;

  getUserDetails(email: string | null) {
    if (email) {
      const encodedEmail = encodeURIComponent(email);
      let apiParam = {
        method: 'GET',
        baseURL: this.baseURL,
        url: `/users/${encodedEmail}/details`
      };
      return this.apiService.httpCall(apiParam);
    }
  }

  getUsers(currentRows: number = 0, records: number = 10, ownerId?: number) {
    let apiParam = {
      method: 'GET',
      url: `/users?currentRow=${currentRows}&records=${records}${
        ownerId ? `&ownerId=${ownerId}` : ''
      }`
    };
    return this.apiService.httpCall(apiParam);
  }

  getUsersByOwner(currentRows: number = 0, records: number = 10, ownerId?: number) {
    let apiParam = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      baseURL: this.baseURL,
      url: `/owners/${ownerId}/users?currentRow=${currentRows}&limit=${records}`,
      timeout: this.requestTimeout,
      responseType: 'json',
      responseEncoding: this.responseEncoding
    };
    return this.apiService.httpCall(apiParam);
  }

  updateBoostGroup(formData: BoostGroupsInterface, ownerId: string, boostGroupId: string) {
    let apiParam = {
      method: 'PUT',
      url: `/owners/${ownerId}/boostGroups/${boostGroupId}`,
      body: formData
    };
    return this.apiService.httpCall(apiParam);
  }

  getListRoles() {
    let apiParam = {
      method: 'GET',
      url: `/roles`
    };
    return this.apiService.httpCall(apiParam);
  }

  sendInvite(formData: UserInterface) {
    let apiParam = {
      method: 'POST',
      url: `/users/invite`,
      body: formData
    };
    return this.apiService.httpCall(apiParam);
  }

  deleteUser(email: string) {
    let apiParam = {
      method: 'DELETE',
      url: `/users/${email}`
    };
    return this.apiService.httpCall(apiParam);
  }
}
