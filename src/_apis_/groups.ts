// utils
import { WrapperService } from './wrapper';

export class BoostGroupService {
  public apiService: WrapperService = new WrapperService();

  getGroups(
    currentRows: number = 0,
    records: number = 10,
    ownerId: string | null,
    isSubGroupList: boolean = false
  ) {
    let apiParam = {
      method: 'GET',
      url: `/owners/${ownerId}/${
        isSubGroupList ? 'subBoostGroups' : 'boostGroups'
      }?${currentRows}&records=${records}`
    };
    return this.apiService.httpCall(apiParam);
  }

  submitBoostGroupForm(
    apiMethod: 'POST' | 'PUT',
    ownerId: string | null,
    subBoostGroupData: object
  ) {
    const subBoostGroup = {
      ...subBoostGroupData
    };
    let apiParam = {
      method: apiMethod,
      url: `/owners/${ownerId}/subBoostGroups`,
      body: subBoostGroup
    };
    return this.apiService.httpCall(apiParam);
  }

  deleteBoostGroupById(ownerId: string | null, boostGroupId: string, isSubGroup: boolean) {
    let apiParam = {
      method: 'DELETE',
      url: `owners/${ownerId}/${isSubGroup ? 'subBoostGroups' : 'boostGroups'}/${boostGroupId}`
    };
    return this.apiService.httpCall(apiParam);
  }
}
