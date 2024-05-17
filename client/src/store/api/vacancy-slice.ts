import { apiSlice } from './api-slice';
import type {
  ICreate,
  IUpdate,
  ICreateVacancyLanguageLevel,
  IUpdateVacancyLanguageLevel,
} from '~/validation/vacancies';
import type {
  Vacancy,
  VacanciesParam,
  VacanciesResponse,
  VacanciesRecommendationResponse,
  VacancyLanguageLevel,
} from '~/types/vacancy';
import type { RecomendedResume } from '~/types/resume';
import { prepareSearchParams } from './prepare-search-params';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVacancies: builder.query<VacanciesResponse, VacanciesParam>({
      query: (queryParams) => ({
        url: `/vacancies`,
        params: prepareSearchParams(queryParams),
      }),
      transformResponse(vacancies: Vacancy[], meta: any) {
        return { vacancies, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (result) => {
        const vacancies = result?.vacancies || [];
        return ['Vacancy', ...vacancies.map(({ id }) => ({ type: 'Vacancy' as const, id }))];
      },
    }),
    getVacancy: builder.query<Vacancy, number>({
      query: (id) => `/vacancies/${id}`,
      providesTags: (_result, _error, arg) => [{ type: 'Vacancy' as const, id: arg }],
    }),
    getVacancyRecommendation: builder.query<VacanciesRecommendationResponse, VacanciesParam & Pick<Vacancy, 'id'>>({
      query: ({ id, ...queryParams }) => ({
        url: `/vacancies/${id}/recommendation`,
        params: prepareSearchParams(queryParams),
      }),
      transformResponse(recomendedResumes: RecomendedResume[], meta: any) {
        return { recomendedResumes, totalCount: Number(meta.response.headers.get('X-Total-Count')) };
      },
      providesTags: (_result, _error, arg) => [{ type: 'Recommendations', id: arg.id }],
    }),
    createVacancy: builder.mutation<Vacancy, ICreate>({
      query: (body) => ({
        url: '/vacancies',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Vacancy', 'Recommendations'],
    }),
    updateVacancy: builder.mutation<Vacancy, IUpdate & Pick<Vacancy, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `/vacancies/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Vacancy', id: arg.id }, 'Recommendations'],
    }),
    deleteVacancy: builder.mutation<void, number>({
      query: (id) => ({
        url: `/vacancies/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vacancy', 'Recommendations'],
    }),
    getVacancyLanguageLevels: builder.query<VacancyLanguageLevel[], number>({
      query: (id) => `/vacancies/${id}/languages`,
      providesTags: (_result, _error, arg) => [{ type: 'VacancyLanguageLevel', id: arg }],
    }),
    createVacancyLanguageLevel: builder.mutation<
      VacancyLanguageLevel,
      ICreateVacancyLanguageLevel & Pick<Vacancy, 'id'>
    >({
      query: ({ id, ...body }) => ({
        url: `/vacancies/${id}/languages`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'VacancyLanguageLevel', id: arg.id }, 'Recommendations'],
    }),
    updateVacancyLanguageLevel: builder.mutation<
      VacancyLanguageLevel,
      IUpdateVacancyLanguageLevel & Pick<Vacancy, 'id'> & Pick<VacancyLanguageLevel, 'language'>
    >({
      query: ({ id, language, ...body }) => ({
        url: `/vacancies/${id}/languages/${language}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'VacancyLanguageLevel', id: arg.id }, 'Recommendations'],
    }),
    deleteVacancyLanguageLevel: builder.mutation<void, Pick<Vacancy, 'id'> & Pick<VacancyLanguageLevel, 'language'>>({
      query: ({ id, language }) => ({
        url: `/vacancies/${id}/languages/${language}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'VacancyLanguageLevel', id: arg.id }, 'Recommendations'],
    }),
  }),
});

export const {
  useGetVacanciesQuery,
  useGetVacancyQuery,
  useGetVacancyRecommendationQuery,
  useCreateVacancyMutation,
  useUpdateVacancyMutation,
  useDeleteVacancyMutation,
  useGetVacancyLanguageLevelsQuery,
  useCreateVacancyLanguageLevelMutation,
  useUpdateVacancyLanguageLevelMutation,
  useDeleteVacancyLanguageLevelMutation,
} = extendedApiSlice;
