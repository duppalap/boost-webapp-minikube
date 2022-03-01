import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { ReportService } from '_apis_/reports';

// ----------------------------------------------------------------------

type ReportState = {
  isLoading: boolean;
  error: boolean;
  reportList: any[];
  reportListCount: number;
};

const initialState: ReportState = {
  isLoading: false,
  error: false,
  reportList: [],
  reportListCount: 0
};

const reportService = new ReportService();

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // DELETE BOOST
    deleteReportSuccess(state, action) {
      const deleteReport = filter(state.reportList, (report) => report.id !== action.payload);
      state.reportList = deleteReport;
    },

    // GET BOOST SUCCESS
    getReportListSuccess(state, action) {
      state.isLoading = false;
      state.reportList = action.payload;
      state.reportListCount = action.payload.length;
    }
  }
});

// ----------------------------------------------------------------------

export function getReportList(
  ownerId: string | null,
  boostGroupId: number | undefined,
  currentRows: number = 0,
  records: number = 10
) {
  return async () => {
    dispatch(reportSlice.actions.startLoading());
    try {
      let boostGroupIds: number[] = [];
      if (boostGroupId) {
        boostGroupIds.push(boostGroupId);
      }
      const response = await reportService.getReportsList(currentRows, records, ownerId, [
        boostGroupId
      ]);
      const data = response.data.rows ? response.data.rows : response.data;
      dispatch(reportSlice.actions.getReportListSuccess(data));
    } catch (error) {
      dispatch(reportSlice.actions.hasError(error));
    }
  };
}

export function deleteReport(reportId: number | null) {
  return async () => {
    dispatch(reportSlice.actions.startLoading());
    try {
      const response = await reportService.deleteReport(reportId);
      if (response && response.status === 200) {
        dispatch(reportSlice.actions.deleteReportSuccess(reportId));
      }
    } catch (error) {
      dispatch(reportSlice.actions.hasError(error));
    }
  };
}

// Reducer
export default reportSlice.reducer;
