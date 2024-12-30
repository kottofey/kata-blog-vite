import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { getToken } from '../../utils/jwt';

const decorateError = (error) => {
  let decoratedError = {};

  console.log('на входе:', JSON.stringify(error, null, 2));

  if (typeof error.data === 'string') {
    console.log(1);
    decoratedError = {
      status: error.originalStatus || error.status,
      message: error.data,
    };
  } else if (!error.data.errors.message) {
    console.log(2);
    console.log(
      JSON.stringify(Object.entries(error.data.errors)[0].join(' '))
    );
    decoratedError = {
      status: error.status || error.originalStatus,
      message: Object.entries(error.data.errors)[0].join(' '),
    };
  } else {
    console.log(3);
    decoratedError = {
      status: error.status || error.originalStatus,
      message: error.data.errors.message,
    };
  }

  if (error.status === 'FETCH_ERROR') {
    decoratedError = {
      status: 599,
      message: 'FETCH_ERROR',
    };
  }

  console.log(
    `на выходе: ${JSON.stringify(decoratedError, null, 2)}`
  );
  return decoratedError;
};

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
      transformErrorResponse: (response) => decorateError(response),
    }),

    getArticle: builder.query({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'GET',
      }),
      providesTags: (result) => {
        // console.log(result.article.slug);
        if (result)
          return [{ type: 'Article', id: result.article.slug }];
        return [''];
      },
      transformErrorResponse: (response) => decorateError(response),
    }),

    getUser: builder.query({
      query: () => ({
        url: 'user',
        method: 'GET',
      }),
      providesTags: ['User'],
      transformErrorResponse: (response) => decorateError(response),
    }),

    signup: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: JSON.stringify(user),
      }),
      invalidatesTags: ['User'],
      transformErrorResponse: (response) => decorateError(response),
    }),

    signin: builder.mutation({
      query: (user) => ({
        url: 'users/login',
        method: 'POST',
        body: JSON.stringify(user),
      }),
      invalidatesTags: ['User'],
      transformErrorResponse: (response) => decorateError(response),
    }),

    editProfile: builder.mutation({
      query: (user) => ({
        url: 'user',
        method: 'PUT',
        body: JSON.stringify(user),
      }),
      invalidatesTags: ['User'],
      transformErrorResponse: (response) => decorateError(response),
    }),

    createArticle: builder.mutation({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: JSON.stringify(article),
      }),
      invalidatesTags: ['Article'],
      transformErrorResponse: (response) => decorateError(response),
    }),

    deleteArticle: builder.mutation({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
      transformErrorResponse: (response) => decorateError(response),
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
      transformErrorResponse: (response) => decorateError(response),
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
      transformErrorResponse: (response) => decorateError(response),
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
      transformErrorResponse: (response) => decorateError(response),
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
