import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Book, Category, ExactBook } from '../../shared/types.books';
import { UserRegistration } from '../../shared/types.user';

const baseUrl = 'https://strapi.cleverland.by';
const booksUrl = '/api/books';
const catUrl = '/api/categories';
const loginUrl = '/api/auth/local/register';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllBooks: builder.query<Book[], string>({
      query: () => booksUrl,
    }),
    getBook: builder.query<ExactBook, string>({
      query: (id) => `${booksUrl}/${id}`,
    }),
    getCategories: builder.query<Category[], string>({
      query: () => catUrl,
    }),
    registerUser: builder.mutation<UserRegistration, UserRegistration>({
      query: (payload) => ({
        url: loginUrl,
        method: 'POST',
        body: payload,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
});

export const { useGetAllBooksQuery, useGetBookQuery, useGetCategoriesQuery, useRegisterUserMutation } = booksApi;
