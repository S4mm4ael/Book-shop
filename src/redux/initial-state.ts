

interface CounterState {
  isBurgerOpen: boolean;
  isGenreMenuOpen: boolean;
  isFetchError: boolean;
  isLoading: boolean;
  category: string | undefined;
  sorting: boolean;
  searchQuery: string | null;
}

export const initialState: CounterState = {
  isBurgerOpen: false,
  isGenreMenuOpen: false,
  isFetchError: false,
  isLoading:true,
  sorting: true,
  category: undefined,
  searchQuery: null,
};
