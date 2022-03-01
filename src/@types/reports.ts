import dayjs from 'dayjs';

export interface ReportBoostGroup {
  boostGroupId: number;
  reportBoostgroupId: number;
}

export interface SelectedRangeInterface {
  chosenLabel: keyof typeof splunkRangeFormats;
  startDate: any;
  endDate: any;
}

export const splunkRangeFormats: { [key: string]: any } = {
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

export interface ReportInterface {
  id: number;
  ownerId: number;
  reportName: string;
  startTime: string;
  endTime: string;
  boostGroups: number[] | null;
  boostGroup?: ReportBoostGroup[];
  boostGroupId?: number;
  dateRange?: SelectedRangeInterface;
  reportType?: ReportsTypesEnum;
}

export interface ReportsResponseInterface {
  count: number;
  message: string;
  rows: ReportInterface[];
}

export interface ReportPayloadInterface {
  report: ReportInterface;
}

export enum ReportsTypesEnum {
  sessionReport = 'Sessions Report',
  chargeUtilizationReport = 'Charge Utilization Report'
}
