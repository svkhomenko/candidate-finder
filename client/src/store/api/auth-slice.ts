import { logout, setUserAndToken } from '../profile-slice';
import { apiSlice } from './api-slice';
import type { IRegister, ILogin } from '~/validation/auth';
import type { IUser, IAccessToken } from '~/types/user';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, IRegister>({
      query: ({ passwordConfirm, ...body }) => ({
        url: 'auth/register',
        method: 'POST',
        body: body,
      }),
    }),
    login: builder.mutation<IUser & { accessToken: IAccessToken }, ILogin>({
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
    logout: builder.mutation<void, void>({
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
    confirmEmail: builder.mutation<void, { confirmToken: string }>({
      query: ({ confirmToken }) => ({
        url: `auth/confirm-email/${confirmToken}`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useConfirmEmailMutation } = extendedApiSlice;
