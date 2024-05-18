import { apiSlice } from './api-slice';
import type { IUser } from '~/types/user';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<IUser, number>({
      query: (id) => `/users/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'User' as const, id: arg }],
    }),
  }),
});

export const { useGetUserQuery } = extendedApiSlice;
