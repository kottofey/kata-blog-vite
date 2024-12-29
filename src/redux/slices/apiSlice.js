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

  tagTypes: ['Article', 'User'],

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
      providesTags: ['Article'],
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
      providesTags: (result) => {
        // console.log(result.article.slug);
        return [{ type: 'Article', id: result.article.slug }];
      },
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
      providesTags: ['User'],
    }),

    signup: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: JSON.stringify(user),
      }),
      invalidatesTags: ['User'],
    }),

    signin: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: JSON.stringify(user),
      }),
      invalidatesTags: ['User'],
    }),

    editProfile: builder.mutation({
      query: (user) => ({
        url: 'user',
        method: 'PUT',
        body: JSON.stringify(user),
      }),
      invalidatesTags: ['User'],
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

    createArticle: builder.mutation({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: JSON.stringify(article),
      }),
      invalidatesTags: ['Article'],
      transformErrorResponse(response) {
        return response;
      },
    }),

    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
      transformErrorResponse(response) {
        return response;
      },
    }),

    editArticle: builder.mutation({
      query: ({ slug, article }) => ({
        url: `articles/${slug}`,
        method: 'PUT',
        body: JSON.stringify(article),
      }),
      invalidatesTags: (result) => {
        return [
          'Article',
          { type: 'Article', id: result.article.slug },
        ];
      },
      transformErrorResponse(response) {
        console.log(
          `edit article error: ${JSON.stringify(response)}`
        );
        return response;
      },
    }),

    likeArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: (result) => {
        return [
          'Article',
          { type: 'Article', id: result.article.slug },
        ];
      },
      transformErrorResponse(response) {
        return response;
      },
    }),

    dislikeArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: (result) => {
        return [
          'Article',
          { type: 'Article', id: result.article.slug },
        ];
      },
      transformErrorResponse(response) {
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
  useCreateArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useDislikeArticleMutation,
} = blogApi;
