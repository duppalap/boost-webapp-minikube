export interface LoginForm {
  email?: string;
  password?: string;
  expirationDate?: number;
  id?: number;
  role?: string;
  roleId?: number;
  token?: string;
  ownerData?: OwnerInterface;
  boostGroup?: {
    boostGroupId: number;
  };
}

export interface UserNotLogged {
  email: string;
  attempts: number;
}

export interface UsersTableItem {
  userId?: number;
  firstName: string;
  lastName: string;
  clientName: string;
  active: string;
  creationDate: string;
  userRoleId: number;
  email?: string;
  boostGroup?: string;
}

export interface OwnerInterface {
  ownerId: number;
  ownerName: string;
  addressId: number;
  user: UsersTableItem;
  createdAt: string;
  updatedAt: string;
  Owner?: any;
  originalData?: any;
  status: boolean;
}
