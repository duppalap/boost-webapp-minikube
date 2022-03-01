import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

import { BoostService } from '_apis_/boost';

// ----------------------------------------------------------------------

type BoostState = {
  isLoading: boolean;
  error: boolean;
  boostList: any[];
  boostListCount: number;
};

const initialState: BoostState = {
  isLoading: false,
  error: false,
  boostList: [],
  boostListCount: 0
};

const boostService = new BoostService();

// ----------------------------------------------------------------------

const unassignedBoostSlice = createSlice({
  name: 'unAssignedboost',
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
    deleteUnassignedBoost(state, action) {
      state.boostList = filter(state.boostList, (boost) => boost.boostId !== action.payload);
    },

    // GET BOOST SUCCESS
    getBoostListSuccess(state, action) {
      state.isLoading = false;
      state.boostList = action.payload;
      state.boostListCount = action.payload.length;
    }
  }
});

export function getUnassignedBoostDeviceList(
  currentRow: number = 0,
  records: number = 10,
  ownerId: string | null,
  boostGroupId: string | null,
  isSubGroup: boolean = false
) {
  return async () => {
    dispatch(unassignedBoostSlice.actions.startLoading());
    try {
      const response = await boostService.getBoostsList({
        currentRow: currentRow,
        limit: records,
        ownerId: ownerId,
        boostGroupId: boostGroupId,
        isSubGroup: isSubGroup,
        unassigned: true
      });
      dispatch(unassignedBoostSlice.actions.getBoostListSuccess(response.data));
    } catch (error) {
      dispatch(unassignedBoostSlice.actions.hasError(error));
    }
  };
}

// Reducer
export default unassignedBoostSlice.reducer;

// Actions
export const { deleteUnassignedBoost } = unassignedBoostSlice.actions;
