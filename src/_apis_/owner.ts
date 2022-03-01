// utils
import { AddOwnerInterface } from '../@types/owner';
import { WrapperService } from './wrapper';

export class OwnerService {
  public apiService: WrapperService = new WrapperService();

  getOwners(currentRows: number = 0, records: number = 10, ownerId?: number) {
    let apiParam = {
      method: 'GET',
      url: `/owners?currentRow=${currentRows}&records=${records}${
        ownerId ? `&ownerId=${ownerId}` : ''
      }`
    };
    return this.apiService.httpCall(apiParam);
  }

  deleteOwner(email: string) {
    let apiParam = {
      method: 'DELETE',
      url: `/owners`,
      params: { email: email }
    };
    return this.apiService.httpCall(apiParam);
  }

  updateOwner(formData: AddOwnerInterface) {
    let apiParam = {
      method: 'PUT',
      url: `/owners/${formData?.owner?.ownerId}`,
      body: formData
    };
    return this.apiService.httpCall(apiParam);
  }
}
