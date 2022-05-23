import { UserType } from '../types';
import API from './_api';

export type BasicReqType = {
  tid: string;
  userId?: string;
  token: string;
};

export type SortFilterType = {
  query?: string;
  orderedby?: string;
  direction?: string;
  page?: number;
  perPage?: Number;
};

export type BodyUserType = {
  body: UserType;
};

export type EditableUserType = {
  body: Partial<UserType>;
};

class Data extends API {
  // user actions
  deleteUser({ tid, userId, token }: BasicReqType) {
    return this.request(`/users?tid=${tid}&userId=${userId}`, {
      method: 'DELETE',
      token,
    });
  }

  editUser({ tid, userId, body, token }: BasicReqType & EditableUserType) {
    return this.request(`/users?tid=${tid}&userId=${userId}`, {
      method: 'PATCH',
      body,
      token,
    });
  }

  addUser({ tid, body, token }: BasicReqType & BodyUserType) {
    return this.request(`/users?tid=${tid}`, {
      method: 'POST',
      body,
      token,
    });
  }

  // licenses

  getLicenses({ tid, token }: BasicReqType) {
    return this.request(`/organization?tid=${tid}`, { token });
  }

  // users list, sort, filter

  getUsers({
    tid,
    orderedby = 'lastActiveDate',
    direction = 'asc',
    query = '',
    page = 0,
    perPage = 10,
    token,
  }: BasicReqType & SortFilterType) {
    return this.request(
      `/users?tid=${tid}&orderby=${orderedby}&query=${query}&direction=${direction}&page=${page}&perPage=${perPage}`,
      { token },
    );
  }
}

export default Data;
