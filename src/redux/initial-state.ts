

interface CounterState {
  isBurgerOpen: boolean;
  isGenreMenuOpen: boolean;
  isFetchError: boolean;
  isLoading: boolean;
  category: string | undefined;
  sorting: string | undefined;
}

export const initialState: CounterState = {
  isBurgerOpen: false,
  isGenreMenuOpen: false,
  isFetchError: false,
  isLoading:true,
  sorting: undefined,
  category: undefined,
};
