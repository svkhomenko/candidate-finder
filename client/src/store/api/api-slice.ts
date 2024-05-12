import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['UserProfile', 'Vacancy', 'Resume', 'ResumeLanguageLevel', 'Recommendations'],
  endpoints: (_builder) => ({}),
});
