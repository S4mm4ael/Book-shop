interface CounterState {
  isBurgerOpen: boolean;
  isGenreMenuOpen: boolean;
  isFetchError: boolean;
  isLoading: boolean;
  category: string | undefined;
  sorting: boolean;
  searchQuery: string;
}
interface CounterUserState {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  isLogged: boolean;
}
export const initialState: CounterState = {
  isBurgerOpen: false,
  isGenreMenuOpen: false,
  isFetchError: false,
  isLoading: true,
  sorting: true,
  category: undefined,
  searchQuery: '',
};

export const initialUserState: CounterUserState = {
  email: ' ',
  username: ' ',
  password: ' ',
  firstName: ' ',
  lastName: ' ',
  phone: ' ',
  isLogged: false,
};
