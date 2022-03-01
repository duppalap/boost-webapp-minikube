import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';

import { BoostGroupService } from '_apis_/groups';

// ----------------------------------------------------------------------

type GroupState = {
  isLoading: boolean;
  error: boolean;
  groupList: any[];
  groupListCount: number;
};

const initialState: GroupState = {
  isLoading: false,
  error: false,
  groupList: [],
  groupListCount: 0
};

const groupService = new BoostGroupService();

const slice = createSlice({
  name: 'group',
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

    // DELETE GROUPS
    deleteGroupSuccess(state, action) {
      const { boostGroupId, isSubGroup } = action.payload;
      state.groupList = filter(state.groupList, function (group) {
        return (isSubGroup ? group.subBoostGroupId : group.boostGroupId) !== boostGroupId;
      });
      state.groupListCount = state.groupListCount - 1;
      state.isLoading = false;
    },

    // GET GROUPS
    getGroupListSuccess(state, action) {
      state.isLoading = false;
      state.groupList = action.payload;
      state.groupListCount = action.payload.length;
    }
  }
});

// ----------------------------------------------------------------------

export function getBoostGroupList(
  ownerId: string | null,
  isSubGroupList: boolean = false,
  currentRows: number = 0,
  records: number = 10
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await groupService.getGroups(ownerId, currentRows, records, isSubGroupList);
      dispatch(slice.actions.getGroupListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteBoostGroup(
  ownerId: string | null,
  boostGroupId: string,
  isSubGroup: boolean = false
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await groupService.deleteBoostGroupById(ownerId, boostGroupId, isSubGroup);
      if (response && response.status === 200) {
        dispatch(slice.actions.deleteGroupSuccess({ boostGroupId, isSubGroup }));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// Reducer
export default slice.reducer;
