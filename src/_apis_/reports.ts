import { boostAppConfig } from "../config";
import { ReportInterface, ReportPayloadInterface } from "../@types/reports";
import { WrapperService } from "./wrapper";

export class ReportService {
  public apiService: WrapperService = new WrapperService();

  public getReportsList(
    currentRow: number,
    limit: number,
    ownerId: string | null,
    boostGroupIds: any[] = []
  ) {
    const filteredBoostGroups = boostGroupIds.filter(Number);
    let apiParam = {
      method: "GET",
      url: `/reports`,
      params: {
        currentRow: currentRow,
        limit: limit,
        owner: ownerId,
        ...(filteredBoostGroups.length > 0 && {
          boostGroupIds: filteredBoostGroups.join(","),
        }),
      },
    };
    return this.apiService.httpCall(apiParam);
  }

  public getReport(reportId: number = 0) {
    let apiParam = {
      method: "GET",
      url: `/reports/${reportId}`,
    };
    return this.apiService.httpCall(apiParam);
  }

  public deleteReport(reportId: number | null) {
    let apiParam = {
      method: "DELETE",
      url: `/reports`,
      params: { report: reportId },
    };
    return this.apiService.httpCall(apiParam);
  }

  public createReport(method: string, payload: ReportPayloadInterface) {
    let apiParam = {
      method: method,
      url: `/reports`,
      body: payload,
    };
    return this.apiService.httpCall(apiParam);
  }

  public getSplunkReport(report: ReportInterface) {
    let apiParam = {
      method: "POST",
      url: `/splunk/reports`,
      body: {
        ownerId: report.ownerId,
        boostGroupIds: (report.boostGroup || []).map((bg) => bg.boostGroupId),
        startTime: report.startTime,
        endTime: report.endTime,
        reportType: report.reportType,
        env: boostAppConfig.env ? boostAppConfig.env : "development",
      },
    };
    return this.apiService.httpCall(apiParam);
  }
}
