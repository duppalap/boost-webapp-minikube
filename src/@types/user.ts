// ----------------------------------------------------------------------

import { FormikProps } from 'formik';

// ----------------------------------------------------------------------

export type UserManager = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};

export type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  userStatusId?: number;
  userRoleId?: number;
  blocked?: boolean;
  BoostGroup?: { boostGroupId: number; boostGroupName?: string };
  Owner?: {
    ownerId: number;
    userId?: number;
    ownerName: string;
    status: string;
  };
  createdAt?: string;
};

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

export interface UserInterface {
  email: string;
  originalEmail?: string;
  firstName: string;
  lastName: string;
  password: string;
  clientName?: string;
  rememberToken?: string;
  boostGroupId?: string;
  userStatusId: number;
  userRoleId: number;
  blocked?: number;
  ownerId?: number;
}
export interface UsersResponseInterface {
  count: number;
  rows: User[];
}

export interface UserRolesInterface {
  userRoleId: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export type UserInvoice = {
  id: string;
  createdAt: Date | string | number;
  price: number;
};

export type CreditCard = {
  id: string;
  cardNumber: string;
  cardType: string;
};

export type Follower = {
  id: string;
  avatarUrl: string;
  name: string;
  country: string;
  isFollowed: boolean;
};

export type Gallery = {
  id: string;
  title: string;
  postAt: Date | string | number;
  imageUrl: string;
};

export type UserAddressBook = {
  id: string;
  name: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
};

export type Profile = {
  id: string;
  cover: string;
  position: string;
  follower: number;
  following: number;
  quote: string;
  country: string;
  email: string;
  company: string;
  school: string;
  role: string;
  facebookLink: string;
  instagramLink: string;
  linkedinLink: string;
  twitterLink: string;
};

export type UserData = {
  id: string;
  avatarUrl: string;
  cover: string;
  name: string;
  follower: number;
  following: number;
  totalPost: number;
  position: string;
};

export type NotificationSettings = {
  activityComments: boolean;
  activityAnswers: boolean;
  activityFollows: boolean;
  applicationNews: boolean;
  applicationProduct: boolean;
  applicationBlog: boolean;
};

export type Friend = {
  id: string;
  avatarUrl: string;
  name: string;
  role: string;
};

export type UserPost = {
  id: string;
  author: {
    id: string;
    avatarUrl: string;
    name: string;
  };
  isLiked: boolean;
  createdAt: Date | string | number;
  media: string;
  message: string;
  personLikes: {
    name: string;
    avatarUrl: string;
  }[];
  comments: {
    id: string;
    author: {
      id: string;
      avatarUrl: string;
      name: string;
    };
    createdAt: Date | string | number;
    message: string;
  }[];
};

export type AccountBillingFormikProps = FormikProps<{
  cardName: string;
  cardNumber: string;
  cardExpired: string;
  cardCvv: string;
}>;
