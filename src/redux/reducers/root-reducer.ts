import { combineReducers } from '@reduxjs/toolkit';

import { booksApi } from '../features/books-slice';

import { dataReducer } from './reducer-data';
import { interfaceReducer } from './reducer-interface';


export const rootReducer = combineReducers({
  interface: interfaceReducer,
  data: dataReducer,
  [booksApi.reducerPath]: booksApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

