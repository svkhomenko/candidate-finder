import { apiSlice } from './api-slice';
import type { ICreate, IUpdate, ICreateResumeLanguageLevel, IUpdateResumeLanguageLevel } from '~/validation/resumes';
import type { Resume, ResumesParam, ResumesResponse, ResumeLanguageLevel } from '~/types/resume';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResumes: builder.query<ResumesResponse, ResumesParam>({
      query: (queryParams) => ({
        url: `/resumes`,
        params: { ...queryParams },
      }),
      transformResponse(resumes: Resume[], meta: any) {
        return { resumes, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const resumes = result?.resumes || [];
        return ['Resume', ...resumes.map(({ id }) => ({ type: 'Resume' as const, id }))];
      },
    }),
    getResume: builder.query<Resume, number>({
      query: (id) => `/resumes/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Resume' as const, id: arg }],
    }),
    createResume: builder.mutation<Resume, ICreate>({
      query: (body) => ({
        url: '/resumes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Resume', 'Recommendations'],
    }),
    updateResume: builder.mutation<Resume, IUpdate & Pick<Resume, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/resumes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Resume', id: arg.id }, 'Recommendations'],
    }),
    deleteResume: builder.mutation<void, number>({
      query: (id) => ({
        url: `/resumes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resume', 'Recommendations'],
    }),
    getResumeLanguageLevels: builder.query<ResumeLanguageLevel[], number>({
      query: (id) => `/resumes/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'ResumeLanguageLevel', id: arg }],
    }),
    createResumeLanguageLevel: builder.mutation<ResumeLanguageLevel, ICreateResumeLanguageLevel & Pick<Resume, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/resumes/${id}/languages`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'ResumeLanguageLevel', id: arg.id }, 'Recommendations'],
    }),
    updateResumeLanguageLevel: builder.mutation<
      ResumeLanguageLevel,
      IUpdateResumeLanguageLevel & Pick<Resume, 'id'> & Pick<ResumeLanguageLevel, 'language'>
    >({
      query: ({ id, language, ...body }) => ({
        url: `/resumes/${id}/languages/${language}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'ResumeLanguageLevel', id: arg.id }, 'Recommendations'],
    }),
    deleteResumeLanguageLevel: builder.mutation<void, Pick<Resume, 'id'> & Pick<ResumeLanguageLevel, 'language'>>({
      query: ({ id, language }) => ({
        url: `/resumes/${id}/languages/${language}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'ResumeLanguageLevel', id: arg.id }, 'Recommendations'],
    }),
  }),
});

export const {
  useGetResumesQuery,
  useGetResumeQuery,
  useCreateResumeMutation,
  useUpdateResumeMutation,
  useDeleteResumeMutation,
  useGetResumeLanguageLevelsQuery,
  useCreateResumeLanguageLevelMutation,
  useUpdateResumeLanguageLevelMutation,
  useDeleteResumeLanguageLevelMutation,
} = extendedApiSlice;
