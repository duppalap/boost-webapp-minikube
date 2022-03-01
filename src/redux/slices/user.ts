import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { UserData, User, UserAddressBook, NotificationSettings } from '../../@types/user';
import { UserService } from '_apis_/user';

// ----------------------------------------------------------------------

type UserState = {
  isLoading: boolean;
  error: boolean;
  myProfile: null | User;
  users: UserData[];
  userList: User[];
  userListCount: number;
  addressBook: UserAddressBook[];
  notifications: NotificationSettings | null;
};

const initialState: UserState = {
  isLoading: false,
  error: false,
  myProfile: null,
  users: [],
  userList: [],
  userListCount: 0,
  addressBook: [],
  notifications: null
};

const userService = new UserService();

const slice = createSlice({
  name: 'user',
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

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(state.userList, (user) => user.userId !== action.payload);
      state.userList = deleteUser;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload?.rows.map((user: any) => ({
        ...user,
        name: `${user.firstName} ${user.lastName}`,
        status: user.userStatusId === 1 ? 'active' : 'inactive',
        clientName: user.Owner ? user.Owner?.ownerName : 'N/A',
        role: getUserRole(user.userRoleId, user.Owner)
      }));
      state.userListCount = action.payload.count;
    },

    // GET ADDRESS BOOK
    getAddressBookSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { deleteUser } = slice.actions;

// ----------------------------------------------------------------------

const getUserRole = (userRoleId: any, Owner: any): string => {
  let userRole: string = userRoleId === 1 ? 'Super Admin' : '';
  if (Owner) {
    if (userRoleId === 2) userRole = 'Owner';
    if (userRoleId === 3) {
      userRole = 'Client Admin';
    }
  }
  return userRole;
};

export function getUserList(currentRows: number = 0, records: number = 10, ownerId?: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      //const response = await axios.get('/api/user/manage-users');
      const response = await userService.getUsers(currentRows, records, ownerId);
      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getUserListByOwner(
  currentRows: number = 0,
  records: number = 10,
  ownerId?: number
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      //const response = await axios.get('/api/user/manage-users');
      const response = await userService.getUsersByOwner(currentRows, records, ownerId);
      dispatch(slice.actions.getUserListSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getNotifications() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/account/notifications-settings');
      dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
