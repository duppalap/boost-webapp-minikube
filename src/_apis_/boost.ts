// utils
import { WrapperService } from './wrapper';
import { EncodeImage, IHoursOfOperationData, IImage } from '../@types/boost';

// ----------------------------------------------------------------------

export interface IBoostQueryParams extends IBoostParamsDevice {
  email?: string;
  ownerId?: any; // We need to check with backend info wich is the correct type.
  boostGroupId?: any; // We need to check with backend info wich is the correct type.
  subBoostGroupId?: number;
  boostId?: number;
  isSubGroup?: boolean;
  /** Define if is an unassigned boost group. */
  unassigned?: boolean;
  currentRow?: number;
  limit?: number;
}

export interface IBoostParamsDevice {
  boostSerialNumber?: string;
  ownerName?: string;
  owner?: string;
  boostGroup?: any;
  boostGroupName?: string;
}
export class BoostService {
  public apiService: WrapperService = new WrapperService();

  public getAllBoostsSuperAdmin() {
    let apiParam = {
      method: 'GET',
      url: `/boosts`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getAllOwnerBoosts(ownerId: number) {
    let apiParam = {
      method: 'GET',
      url: `/boosts`,
      params: { ownerId: ownerId }
    };
    return this.apiService.httpCall(apiParam);
  }

  public getAllBoostsClient(ownerId: number, boostGroupId: number) {
    let apiParam = {
      method: 'GET',
      url: `/owners/${ownerId}/boostGroups/${boostGroupId}/boosts`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getBoostGroups(ownerId: number, unassignedToUser?: number) {
    let apiParam = {
      method: 'GET',
      url: `/owners/${ownerId}/boostGroups`,
      params: { unassignedToUser: unassignedToUser }
    };
    return this.apiService.httpCall(apiParam);
  }

  public getBoostGroup(ownerId: string, boostGroupId: string, isSubGroup?: boolean) {
    let apiParam = {
      method: 'GET',
      url: `/owners/${ownerId}/${isSubGroup ? 'subBoostGroups' : 'boostGroups'}/${boostGroupId}`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getBoost(ownerId: string, boostId: string) {
    let apiParam = {
      method: 'GET',
      url: `/owners/${ownerId}/boosts/${boostId}`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getNetworks() {
    let apiParam = {
      method: 'GET',
      url: `/networks`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getTimesZones() {
    let apiParam = {
      method: 'GET',
      url: `/time-zones`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getCurrencies() {
    let apiParam = {
      method: 'GET',
      url: `/currencies`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getLanguages() {
    let apiParam = {
      method: 'GET',
      url: `/languages`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getImages(ownerId: string | null) {
    let apiParam = {
      method: 'GET',
      url: `/owners/${ownerId}/images`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getCountries() {
    let apiParam = {
      method: 'GET',
      url: `/countries`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getLogos(ownerId: string | null) {
    let apiParam = {
      method: 'GET',
      url: ownerId ? `/logos?owner=${ownerId}` : `/logos`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getPricingTypes() {
    let apiParam = {
      method: 'GET',
      url: `/pricings/types`
    };
    return this.apiService.httpCall(apiParam);
  }

  public getDischargingTypes() {
    let apiParam = {
      method: 'GET',
      url: `/discharging-types`
    };
    return this.apiService.httpCall(apiParam);
  }

  public postOperationHours(
    isTimeUseSection: boolean | undefined,
    ownerId: string | undefined,
    boostGroupId: string | undefined,
    data: IHoursOfOperationData
  ) {
    let url = isTimeUseSection
      ? `/owners/${ownerId}/boostGroups/${boostGroupId}/timeOfUse`
      : `/owners/${ownerId}/boostGroups/${boostGroupId}/operationHours`;
    // Observable<any> Any because we need to set the common interface that the backend its going to return
    let apiParam = {
      method: 'PUT',
      body: data,
      url: url
    };
    return this.apiService.httpCall(apiParam);
  }

  public getOperationHours(
    ownerId: string,
    boostGroupId: string,
    isTimeUseSection: boolean = false,
    isSubGroup: boolean = false
  ) {
    let apiParam = {
      method: 'GET',
      url: `/owners/${ownerId}/${isSubGroup ? 'subBoostGroups' : 'boostGroups'}/${boostGroupId}/${
        isTimeUseSection ? 'timeOfUse' : 'operationHours'
      }`
    };
    return this.apiService.httpCall(apiParam);
  }

  public updateBoostGroup(
    ownerId: string,
    boostGroupId: string,
    boostGroupData: object,
    subBoostGroupId?: string
  ) {
    let apiParam = {
      method: 'PUT',
      url: subBoostGroupId
        ? `/owners/${ownerId}/subBoostGroups/${subBoostGroupId}`
        : `/owners/${ownerId}/boostGroups/${boostGroupId}`,
      body: { boostGroup: { ...boostGroupData } }
    };
    return this.apiService.httpCall(apiParam);
  }

  public postImage(
    encodeImage: EncodeImage,
    image: File,
    ownerId: string,
    boostGroupId: string,
    subBoostGroupId?: number
  ) {
    const fileName = image?.name
      .replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '')
      .replace(/\s/g, '');
    let apiParam = {
      method: 'POST',
      url: subBoostGroupId
        ? `/owners/${ownerId}/subBoostGroup/${subBoostGroupId}/images`
        : `/owners/${ownerId}/boostGroup/${boostGroupId}/images`,
      body: {
        image: encodeImage,
        imageName: fileName,
        ...(subBoostGroupId && { subBoostGroupId })
      }
    };
    return this.apiService.httpCall(apiParam);
  }

  public postLogo(boostGroupId: number, ownerId: string, logo: IImage, subBoostGroupId?: number) {
    let apiParam = {
      method: 'POST',
      url: `/logos`,
      body: {
        logo: {
          logoName: logo.logoName,
          logo: logo.logoUrl,
          ownerId: ownerId,
          boostGroupId: boostGroupId,
          ...(subBoostGroupId && { subBoostGroupId })
        }
      }
    };
    return this.apiService.httpCall(apiParam);
  }

  public submitForm(method: string, body: any, url: string) {
    let apiParam = {
      method: method,
      url: url,
      body: body
    };
    return this.apiService.httpCall(apiParam);
  }

  public deletePricingModel(ownerId: string, boostGroupId: string, subBoostGroupId: string) {
    let url: string = subBoostGroupId
      ? `/owners/${ownerId}/subBoostGroup/${subBoostGroupId}/pricings`
      : `/owners/${ownerId}/boostGroup/${boostGroupId}/pricings`;
    let apiParam = {
      method: 'DELETE',
      url: url
    };
    return this.apiService.httpCall(apiParam);
  }

  public getTotalBoostGroupsSplunk(ownerId: string, boostGroupId: string) {
    let apiParam = {
      method: 'POST',
      url: `/dashboard/boostgroups`,
      body: { ownerId: ownerId, boostGroupId: boostGroupId }
    };
    return this.apiService.httpCall(apiParam);
  }

  public getTotalBoostSplunk(ownerId: string, boostGroupId: string) {
    let apiParam = {
      method: 'POST',
      url: `/dashboard/boosts`,
      body: { ownerId: ownerId, boostGroupId: boostGroupId }
    };
    return this.apiService.httpCall(apiParam);
  }

  public getReportSplunkInformation(
    startTime: any,
    endTime: any,
    ownerId: any,
    boostGroupId: any,
    report: string,
    env: string
  ): Promise<any> {
    let apiParam = {
      method: 'POST',
      url: `/dashboard/reports`,
      body: {
        ownerId: ownerId,
        boostGroupIds: Array.isArray(boostGroupId) ? boostGroupId : [boostGroupId],
        startTime: startTime,
        endTime: endTime,
        reportType: report,
        env: env
      }
    };
    return this.apiService.httpCall(apiParam);
  }

  public getSocInformation(
    startTime: any,
    endTime: any,
    ownerId: any,
    boostGroupId: any,
    boostId: any,
    env: string
  ): Promise<any> {
    let apiParam = {
      method: 'POST',
      url: `/splunk/reports`,
      body: {
        ownerId: ownerId,
        boostGroupIds: Array.isArray(boostGroupId) ? boostGroupId : [boostGroupId],
        startTime: startTime,
        endTime: endTime,
        reportType: 'State of Charge',
        boostId: boostId,
        env: env
      }
    };
    return this.apiService.httpCall(apiParam);
  }

  public getBoostsList(params: IBoostQueryParams) {
    let urlQuery: string = params.unassigned
      ? `/owners/${params.ownerId}/boosts/unassigned`
      : params.isSubGroup
      ? `/owners/${params.ownerId}/subBoostGroups/${params.boostGroupId}/boosts`
      : `/owners/${params.ownerId}/boostGroups/${params.boostGroupId}/boosts`;
    let apiParam = {
      method: 'GET',
      url: urlQuery,
      params: { currentRow: params.currentRow, limit: params.limit, ownerId: params.ownerId }
    };
    return this.apiService.httpCall(apiParam);
  }

  /**
   * Return the pricing model according to the params.
   */
  public getHistoricPricingModel(ownerId: number, boostGroupId: number) {
    const urlQuery = `/owners/${ownerId}/boostGroup/${boostGroupId}/pricing/history`;
    const apiParam = {
      method: 'GET',
      url: urlQuery
    };
    return this.apiService.httpCall(apiParam);
  }
}
