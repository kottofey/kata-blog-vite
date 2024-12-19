import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
  }),

  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (args) => {
        const { limit, offset } = args;
        return {
          url: `articles?limit=${limit}&offset=${offset}`,
          method: 'GET',
        };
      },
    }),

    getArticle: builder.query({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery } = blogApi;
