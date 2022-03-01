import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import { ReportService } from '_apis_/reports';
import { ReportInterface } from '../../@types/reports';

// ----------------------------------------------------------------------

type SessionState = {
  isLoading: boolean;
  error: boolean;
  columns: string[];
  rows: string[];
};

const initialState: SessionState = {
  isLoading: false,
  error: false,
  columns: [],
  rows: []
};

const reportService = new ReportService();

const sessionSlice = createSlice({
  name: 'session',
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

    // GET BOOST SUCCESS
    getSessionListSuccess(state, action) {
      const { columns, rows } = action.payload;
      state.isLoading = false;
      state.rows = rows;
      state.columns = columns;
    }
  }
});

// ----------------------------------------------------------------------

export function getSessionList(report: ReportInterface) {
  return async () => {
    dispatch(sessionSlice.actions.startLoading());
    try {
      const response = await reportService.getSplunkReport(report);
      if (response.data) {
        const fields: string[] = response.data.fields;
        let columns: any[] = [];
        if (fields && fields.length > 0) {
          fields.forEach((field: any, index: number) => {
            columns.push({
              id: field,
              label: field.replace(/_/g, ' '),
              alignRight: false
            });
          }, {});
        }
        const rows = response.data.rows.map((row: any) => {
          const record: any = {};
          fields.forEach((field: string, idx: number) => {
            if (field.includes('Duration')) {
              record[field] = row[idx] + ' Min';
            } else if (field.includes('Dispensed')) {
              record[field] = row[idx] + ' kWh';
            } else if (field.includes('Delivered')) {
              record[field] = row[idx] + ' kW';
            } else {
              record[field] = row[idx];
            }
          });
          return record;
        });
        dispatch(sessionSlice.actions.getSessionListSuccess({ columns, rows }));
      }
    } catch (error) {
      dispatch(sessionSlice.actions.hasError(error));
    }
  };
}

// Reducer
export default sessionSlice.reducer;
