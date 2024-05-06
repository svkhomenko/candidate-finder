import { logout, setUserAndToken } from '../profile-slice';
import { apiSlice } from './api-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body: body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body: body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserAndToken(data));
        } catch (error) {}
      },
      invalidatesTags: ['UserProfile'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {}
      },
    }),
    confirmEmail: builder.mutation({
      query: ({ confirmToken }) => ({
        url: `auth/confirm-email/${confirmToken}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useConfirmEmailMutation } = extendedApiSlice;
