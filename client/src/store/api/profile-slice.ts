import { apiSlice } from './api-slice';
import { logout, setUser, updateUser } from '../profile-slice';
import type { IUser } from '~/types/user';
import type { IUpdate } from '~/validation/profile';

type IResUpdate = { isConfirmed: boolean };

export const profileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IUser, void>({
      query: () => 'profile',
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
      providesTags: ['UserProfile'],
    }),
    updateProfile: builder.mutation<IResUpdate, IUpdate>({
      query: (body) => ({
        url: 'profile',
        method: 'PUT',
        body: body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.isConfirmed) {
            dispatch(updateUser(body));
          } else {
            dispatch(logout());
          }
        } catch (error) {}
      },
      invalidatesTags: ['UserProfile'],
    }),
    deleteProfile: builder.mutation({
      query: () => ({
        url: 'profile',
        method: 'DELETE',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error) {}
      },
      invalidatesTags: ['UserProfile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation, useDeleteProfileMutation } = profileSlice;
