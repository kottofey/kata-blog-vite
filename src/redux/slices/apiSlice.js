import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { getToken } from '../../utils/jwt';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      if (getToken())
        headers.set('Authorization', `Token ${getToken()}`);
    },
  }),

  endpoints: (builder) => ({
    getArticles: builder.query({
      query: ({ limit, offset }) => {
        return {
          url: 'articles',
          method: 'GET',
          params: {
            limit,
            offset,
          },
        };
      },
      transformErrorResponse(response) {
        if (response.status === 'FETCH_ERROR') {
          return {
            status: 599,
            data: {
              errors: {
                [response.error]: '',
              },
            },
          };
        }

        return response;
      },
    }),

    getArticle: builder.query({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'GET',
      }),
      transformErrorResponse: (response) => {
        if (typeof response.data === 'string') {
          return {
            status: response.originalStatus,
            data: {
              errors: {
                [response.data]: '',
              },
            },
          };
        }
        if (response.status === 'FETCH_ERROR') {
          return {
            status: 599,
            data: {
              errors: {
                [response.error]: '',
              },
            },
          };
        }

        return response;
      },
    }),

    getUser: builder.query({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
    }),

    signup: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: JSON.stringify(user),
      }),
    }),

    signin: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: JSON.stringify(user),
      }),
    }),

    editProfile: builder.mutation({
      query: (user) => ({
        url: 'user',
        method: 'PUT',
        body: JSON.stringify(user),
      }),
      transformErrorResponse: (response) => {
        if (typeof response.data === 'string') {
          return {
            status: response.originalStatus,
            data: {
              errors: {
                [response.data]: '',
              },
            },
          };
        }
        if (response.status === 'FETCH_ERROR') {
          return {
            status: 599,
            data: {
              errors: {
                [response.error]: '',
              },
            },
          };
        }

        return response;
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useSignupMutation,
  useSigninMutation,
  useGetUserQuery,
  useEditProfileMutation,
} = blogApi;
