import { UserInterface, UsersTableItem } from './user';

export interface ListOwnerInterface extends OwnerInterface {
  createdAt: string;
  updatedAt: string;
  Address: AddressInterface;
  User?: UsersDataOwner;
}

export interface OwnersResponseInterface {
  count: number;
  rows: ListOwnerInterface[];
}

export interface ListOwnerByOwnerInterface {
  User: UsersDataOwner;
}

// TODO: Replace this with your own data model type
export interface UsersDataOwner {
  userId: number;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface AddressInterface {
  addressId: number;
  addressType: string;
  street: string;
  zipCode: number;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OwnerInterface {
  ownerId: number;
  ownerName: string;
  addressId: number;
  userId?: string;
  user?: UsersTableItem;
  Address?: AddressInterface;
  createdAt?: string;
  updatedAt?: string;
  status: boolean;
}

export interface AddressInterface {
  addressId: number;
  addressType: string;
  street: string;
  zipCode: number;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddOwnerInterface {
  user?: UserInterface;
  owner?: OwnerInterface;
  address?: AddressInterface;
}
