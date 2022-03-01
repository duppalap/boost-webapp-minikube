import { AccordionProps } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
export interface BoostDeviceInterfaceSplunk {
  reportInfo?: any; // Any from the server.
  chargeEnergy?: any;
  sessionsCount?: any;
  sessionHoursCount?: any;
  boostStatus?: any;
  leftConnector?: string;
  rightConnector?: string;
}

export interface IRespreports {
  rows: any[];
  fields: string[];
  boostGroupId?: number;
}

export interface BoostGroupsInterface {
  boostGroupId: number;
  boostGroupName: string;
  userId: number;
  ownerId: number;
  languageId: number;
  level: number;
  parentId?: null;
  createdAt?: Date;
  updatedAt?: Date;
  mainColorTheme?: string;
  secondaryColorTheme?: string;
  Boost?: BoostDevices;
  boostsCount?: string;
}

export interface SubBoostGroupsInterface {
  boostGroupId: number;
  subBoostGroupName: string;
  subBoostGroupId: number;
  boostGroupName: string;
  userId: number;
  ownerId: number;
  languageId: number;
  createdAt?: Date;
  updatedAt?: Date;
  mainColorTheme?: string;
  secondaryColorTheme?: string;
  Boost?: BoostDevices;
}

export interface BoostDeviceInterface extends BoostDeviceInterfaceSplunk {
  boostSerialNumber: string;
  ownerId?: number;
  boostGroupId?: number;
  BoostGroup?: BoostGroupsInterface;
  subBoostGroupId?: number;
  totalBoostGroups?: number;
  totalBoost?: number;
  geoLocation?: IGeoLocation;
  Address?: {
    street: string;
    zipCode: string;
    state: string;
    country: string;
  };
  addressId?: number;
  boostId?: number;
  boostGroupName: string;
  boostName?: string;
  createdAt?: string;
  networkId?: string;
  networkURL?: string;
  technicalStatus?: boolean;
  updatedAt?: string;
  clientId?: any;
}

export interface BoostDevices {
  boostGroupRelationsId: number;
  boostId: number;
  boostGroupId: number;
  createdAt: Date;
  updatedAt: Date;
  Boost: BoostInterface;
  BoostGroup: BoostGroupsInterface;
  unassigned?: boolean;
  boostName?: string;
  boostSerialNumber?: string;
}

export interface BoostDevicesResponse {
  count: number;
  rows?: BoostDevices[];
}

export interface BoostInterface {
  boostId: number;
  boostName: string;
  boostSerialNumber: string;
  networkURL: string;
  technicalStatus: string;
  createdAt?: Date;
  updatedAt?: Date;
  unassigned?: boolean;
}

export interface IGeoLocation {
  location_type?: string;
  formatted_address?: string;
  lat?: number;
  lng?: number;
}

export interface IGeometry {
  address_components: Array<any>;
  formatted_address: string;
  geometry: { location: { lat: number; lng: number }; location_type: string };
  place_id: string;
  types: Array<string>;
}

export interface IRespreports {
  rows: any[];
  fields: string[];
  boostGroupId?: number;
}

export enum ConnectorStatus {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE',
  Offline = 'OFFLINE',
  Charging = 'CHARGING'
}

export interface IBoost {
  addressId?: number;
  boostGroupId?: number;
  boostId: number;
  boostName: string;
  boostSerialNumber: string;
  networkId?: number;
  networkURL?: string;
  ownerId?: number;
  technicalStatus?: boolean;
}

export interface IBoostGroup {
  boostGroupId: number;
  boostGroupName: string;
  level: number;
  subBoostGroupName?: string;
  subBoostGroupId?: string;
  ownerId?: number;
  userId?: number;
  lowStateOfChargeValue?: number;
  networkURL: string;
  BoostGHrsOps: IBoostHoursOfOperation[];
  Network?: INetwork;
  Pricings: PricingModelInterface[];
  Contact: IContact;
  Image: IImage;
  Logo: IImage;
  logoId?: number;
  imageId?: number;
  TimeZone: ITimesZones;
  autoRechargingSOCLimit?: number;
  Currency?: {
    id: number;
  };
  timeOfUses: IHoursOfOperation[];
  country: string;
  languageId?: number;
  mainColorTheme?: string;
  secondaryColorTheme?: string;
  Boosts: IBoost[];
}

export interface IBoostGroupNetwork {
  networkId?: number;
  networkName?: string;
  networkURL?: string;
}

export interface IContact {
  contactId?: number;
  firstName: string;
  lastName: string;
  phone: string;
  region?: string;
}

export interface ICountries {
  countryId: number;
  code: string;
  name: string;
}

export interface ITimesZones {
  id: number;
  name: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICurrencies {
  currencyId: string;
  currencyName: string;
  currencySymbol: string;
}

export interface ILanguages {
  languageId: number;
  languageName: string;
  createdAt: string;
  updatedAt: string;
}

export type INetwork = Pick<IBoostGroupNetwork, 'networkId' | 'networkName'>;

export enum IBoostWeekDays {
  monday = 'Monday',
  tuesday = 'Tuesday',
  wednesday = 'Wednesday',
  thursday = 'Thursday',
  friday = 'Friday',
  saturday = 'Saturday',
  sunday = 'Sunday'
}

export interface IHoursOfOperation {
  dayName?: IBoostWeekDays;
  /** Monday as 0 */
  day: number;
  isActive: boolean;
  openTime?: any;
  closeTime?: any;
  subBoostGroupId?: string;
}

export interface IHoursOfOperationData {
  boostGHrsOp?: IHoursOfOperation[];
  timeOfUSe?: IHoursOfOperation[];
  timeZoneId?: number;
}

export interface IBoostHoursOfOperation {
  boostGHrsOpId: number;
  day: number;
  openTime: string;
  closeTime: string;
}

export interface PricingModelInterface {
  pricingId?: string;
  rate: number;
  pricingName: string;
  pricingTypeId: number;
  preAuthAmount: number;
  minimumPayment: number;
  dischargingTypeId?: number | undefined;
  dischargingLowerLimit?: number | undefined;
  dischargingHigherLimit?: number | undefined;
  status?: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export interface PricingTypeInterface {
  pricingTypeId: number;
  pricingName: string;
}

export type EncodeImage = string | ArrayBuffer | null | undefined;

export interface IImage {
  imageId?: number;
  logoId?: number;
  image: { data: []; type: string };
  logo: { data: []; type: string };
  imageName: string;
  ownerId: number;
  imageUrl?: string;
  logoUrl?: string;
  selected?: boolean;
  updatedAt?: string;
  logoName?: string;
}

export interface ImageDetailsResponseInterface {
  count: number;
  rows: IImage[];
}

export interface IHoursOfOperationResponse {
  count: number;
  rows: IHoursOfOperation[];
}

export interface DischargingType {
  id: number;
  name: string;
  label: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoostAddDeviceInterfaceSplunk {
  reportInfo?: any; // Any from the server.
  chargeEnergy?: any;
  sessionsCount?: any;
  sessionHoursCount?: any;
  boostStatus?: any;
  leftConnector?: string;
  rightConnector?: string;
}
export interface BoostAddDeviceInterface extends BoostAddDeviceInterfaceSplunk {
  boostSerialNumber?: string;
  ownerId?: number;
  boostGroupId?: number;
  BoostGroup?: BoostGroupsInterface;
  subBoostGroupId?: number;
  totalBoostGroups?: number;
  totalBoost?: number;
  geoLocation?: IGeoLocation;
  Address?: {
    street: string;
    zipCode: string;
    state: string;
    country: string;
  };
  addressId?: number;
  boostId?: number;
  boostGroupName?: string;
  boostName?: string;
  createdAt?: string;
  networkId?: string;
  networkURL?: string;
  technicalStatus?: boolean;
  updatedAt?: string;
  clientId?: any;
}

export interface IBoostAccordianProps extends AccordionProps {
  title: string | undefined;
  help?: string;
  subtitle?: string;
  content?: any;
  info?: string;
  pricingHistory?: string;
  icon?: JSX.Element;
}

const selectedRangeChosen: string = 'MM/DD/YYYY';

const splunkDateFormat: string = 'YYYY-MM-DDTHH:mm:ss';

const splunkRangeFormats: { [key: string]: any } = {
  Yesterday: {
    startTime: '-1d@d',
    endTime: '@d',
    startTimeEquivalent: dayjs().subtract(1, 'days'),
    endTimeEquivalent: dayjs().subtract(1, 'days')
  },
  'Last 7 Days': {
    startTime: '-7d@d',
    endTime: '@d',
    startTimeEquivalent: dayjs().subtract(6, 'days'),
    endTimeEquivalent: dayjs()
  },
  'Last 30 Days': {
    startTime: '-30d@d',
    endTime: '@d',
    startTimeEquivalent: dayjs().subtract(29, 'days'),
    endTimeEquivalent: dayjs()
  },
  'This Month': {
    startTime: '@mon',
    endTime: '@d',
    startTimeEquivalent: dayjs().startOf('month'),
    endTimeEquivalent: dayjs().endOf('month')
  },
  'Last Month': {
    startTime: '-1mon@mon',
    endTime: '@mon',
    startTimeEquivalent: dayjs().subtract(1, 'month').startOf('month'),
    endTimeEquivalent: dayjs().subtract(1, 'month').endOf('month')
  },
  'Last 3 Month': {
    startTime: '-3mon@mon',
    endTime: '@mon',
    startTimeEquivalent: dayjs().subtract(3, 'month').startOf('month'),
    endTimeEquivalent: dayjs().subtract(1, 'month').endOf('month')
  }
};

export interface IDateRangeFormat {
  chosenLabel: any;
  startDate?: any;
  endDate?: any;
}

export const getSelectedRangeFromSplunkFormats = (
  startTime: string,
  endTime: string
): IDateRangeFormat => {
  // means that the values are probably on splunk's own format and we need to match them with the option we have for display
  dayjs.extend(customParseFormat);
  const startDate = dayjs(startTime, splunkDateFormat);
  const endDate = dayjs(endTime, splunkDateFormat);
  if (startDate.isValid() && endDate.isValid()) {
    // dates are valid so it means custom range
    return {
      chosenLabel: `${startDate.format(selectedRangeChosen)} - ${endDate.format(
        selectedRangeChosen
      )}`,
      startDate: startDate,
      endDate: endDate
    };
  } else {
    for (const property in splunkRangeFormats) {
      if (
        splunkRangeFormats[property].startTime === startTime &&
        splunkRangeFormats[property].endTime === endTime
      ) {
        return {
          chosenLabel: property,
          startDate: splunkRangeFormats[property].startTimeEquivalent,
          endDate: splunkRangeFormats[property].endTimeEquivalent
        };
      }
    }
  }
  return {
    chosenLabel: ''
  };
};
