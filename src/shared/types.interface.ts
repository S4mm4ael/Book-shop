import { Dispatch, SetStateAction } from 'react';

import { ImageBook } from './types.books';

export type SearchProps = {
  isListView: boolean;
  changeView: Dispatch<SetStateAction<boolean>>;
};

export type SearchBarProps = {
  isSearching: boolean;
  changeView: Dispatch<SetStateAction<boolean>>;
};

export type SliderProps = {
  isDesktopSize: boolean;
  images?: ImageBook[] | null;
  id?: number;
};

export type CommentProps = {
  avatar: string | null;
  name: string;
  rating: number;
  date: string;
  text: string;
};
