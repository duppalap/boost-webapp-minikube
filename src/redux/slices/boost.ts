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

const boostSlice = createSlice({
  name: 'boost',
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
    deleteBoost(state, action) {
      const deleteBoost = filter(state.boostList, (boost) => boost.boostId !== action.payload);
      state.boostList = deleteBoost;
    },

    // GET BOOST SUCCESS
    getBoostListSuccess(state, action) {
      state.isLoading = false;
      state.boostList = action.payload;
      state.boostListCount = action.payload.length;
    }
  }
});

// ----------------------------------------------------------------------

export function getBoostList(
  ownerId: string | null,
  boostGroupId: string | null,
  currentRow: number = 0,
  records: number = 10,
  isSubGroup: boolean = false
) {
  return async () => {
    dispatch(boostSlice.actions.startLoading());
    try {
      const response = await boostService.getBoostsList({
        currentRow: currentRow,
        limit: records,
        ownerId: ownerId,
        boostGroupId: boostGroupId,
        isSubGroup: isSubGroup,
        unassigned: false
      });

      const data = response.data.rows ? response.data.rows : response.data;
      dispatch(boostSlice.actions.getBoostListSuccess(data));
    } catch (error) {
      dispatch(boostSlice.actions.hasError(error));
    }
  };
}

// Reducer
export default boostSlice.reducer;

// Actions
export const { deleteBoost } = boostSlice.actions;
