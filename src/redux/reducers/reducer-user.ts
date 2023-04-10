/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

import { initialUserState } from '../initial-state';

const email = createAction<string>('EMAIL');
const username = createAction<string>('USER_NAME');
const password = createAction<string>('PASSWORD');
const firstName = createAction<string>('FIRST_NAME');
const lastName = createAction<string>('LAST_NAME');
const phone = createAction<string>('PHONE');
const isLogged = createAction<boolean>('IS_LOGGED');
const token = createAction<string | null>('TOKEN');
const bookedBooks = createAction<number>('ADD_BOOK');

export const userReducer = createReducer(initialUserState, (builder) => {
  builder.addCase(email, (state, action) => {
    state.email = action.payload;
  });
  builder.addCase(username, (state, action) => {
    state.username = action.payload;
  });
  builder.addCase(password, (state, action) => {
    state.password = action.payload;
  });
  builder.addCase(firstName, (state, action) => {
    state.firstName = action.payload;
  });
  builder.addCase(lastName, (state, action) => {
    state.lastName = action.payload;
  });
  builder.addCase(phone, (state, action) => {
    state.phone = action.payload;
  });
  builder.addCase(isLogged, (state, action) => {
    state.isLogged = action.payload;
  });
  builder.addCase(token, (state, action) => {
    state.token = action.payload;
  });
  builder.addCase(bookedBooks, (state, action) => {
    state.bookedBooks.push(action.payload);
  });
});
