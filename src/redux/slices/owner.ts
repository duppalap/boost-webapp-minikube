import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

import { OwnerService } from '_apis_/owner';
import { ListOwnerInterface } from '../../@types/owner';

// ----------------------------------------------------------------------

type OwnerState = {
  isLoading: boolean;
  error: boolean;
  ownerList: ListOwnerInterface[];
  ownerListCount: number;
};

const initialState: OwnerState = {
  isLoading: false,
  error: false,
  ownerList: [],
  ownerListCount: 0
};

const ownerService = new OwnerService();

const slice = createSlice({
  name: 'owner',
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

    // DELETE USERS
    deleteOwner(state, action) {
      const deleteUser = filter(state.ownerList, (owner) => owner.userId !== action.payload);
      state.ownerList = deleteUser;
    },

    // GET MANAGE USERS
    getOwnerListSuccess(state, action) {
      state.isLoading = false;
      state.ownerList = action.payload.rows;
      state.ownerListCount = action.payload.count;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteOwner } = slice.actions;

// ----------------------------------------------------------------------

export function getOwnerList(currentRows: number = 0, records: number = 10, ownerId?: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await ownerService.getOwners(currentRows, records, ownerId);
      dispatch(slice.actions.getOwnerListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
