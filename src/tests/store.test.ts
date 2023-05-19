import authSlice, { setAuth, UserAuth } from "/src/store/slices/authSlice";
import { defaultFilters } from "/src/utils/filters/filtersVariables";
import {
  filtersSlice,
  FiltersState,
} from "/src/store/slices/filtersSlice";
import { mockMovie } from "/src/utils/movie";
import { IFilters } from "/src/types/IFilter";
import { IMovie } from "/src/types/IMovie";
import getSortedList from "/src/utils/filters/getSortedList";
import {IMovieModal, modalsSlice, ModalStates} from "/src/store/slices/modalsSlice";

describe("authSlice", () => {
  it("should return the correct state", () => {
    const previousState: UserAuth = { isLogged: false, userEmail: "" };
    expect(
      authSlice(previousState, setAuth({ userEmail: "test", isLogged: true }))
    ).toEqual({
      userEmail: "test",
      isLogged: true,
    });
  });
});

describe("filtersSlice", () => {
  let initialState: FiltersState;
  beforeEach(() => {
    initialState = {
      filters: defaultFilters,
      filteredMovies: [],
      filteredMoviesPage: 1,
      sortingMethod: "assessments",
      isMoviesLoading: false,
    };
  });
  it("should handle setFilters", () => {
    const filters: IFilters = {
      genres: "Action",
      countries: "Brazil",
      year: "1999",
      rating: "100",
      assessments: "none",
      actor: "Jonny",
      director: "Billy",
    };
    const action = filtersSlice.actions.setFilters(filters);
    const newState = filtersSlice.reducer(initialState, action);

    expect(newState.filters).toEqual(filters);
  });
  it("should handle setFilteredMovies", () => {
    const movies: IMovie[] = [mockMovie];

    const expectedFilteredMovies = getSortedList(
      initialState.sortingMethod,
      movies
    );

    const action = filtersSlice.actions.setFilteredMovies(movies);
    const newState = filtersSlice.reducer(initialState, action);

    expect(newState.filteredMovies).toEqual(expectedFilteredMovies);
  });
  it("should handle setFilteredMoviesPage", () => {
    const page = 2;

    const action = filtersSlice.actions.setFilteredMoviesPage(page);
    const newState = filtersSlice.reducer(initialState, action);

    expect(newState.filteredMoviesPage).toEqual(page);
  });

  it("should handle setSortingMethod", () => {
    const sortingMethod = "newest";

    const action = filtersSlice.actions.setSortingMethod(sortingMethod);
    const newState = filtersSlice.reducer(initialState, action);

    expect(newState.sortingMethod).toEqual(sortingMethod);
  });

  it("should handle setIsMoviesLoading", () => {
    const isLoading = true;

    const action = filtersSlice.actions.setIsMoviesLoading(isLoading);
    const newState = filtersSlice.reducer(initialState, action);

    expect(newState.isMoviesLoading).toEqual(isLoading);
  });
});

describe('modalsSlice', () => {
  let initialState: ModalStates;

  beforeEach(() => {
    initialState = {
      showAuthModal: false,
      showSearchModal: false,
      showMovieModal: { isShow: false, defaultTab: 'actors' },
    };
  });

  it('should handle setShowMovieModal', () => {
    const movieModal: IMovieModal = {
      isShow: true,
      defaultTab: 'actors',
    };

    const action = modalsSlice.actions.setShowMovieModal(movieModal);
    const newState = modalsSlice.reducer(initialState, action);

    expect(newState.showMovieModal).toEqual(movieModal);
  });

  it('should handle setShowSearchModal', () => {
    const showSearchModal = true;

    const action = modalsSlice.actions.setShowSearchModal(showSearchModal);
    const newState = modalsSlice.reducer(initialState, action);

    expect(newState.showSearchModal).toEqual(showSearchModal);
  });

  it('should handle setShowAuthModal', () => {
    const showAuthModal = true;

    const action = modalsSlice.actions.setShowAuthModal(showAuthModal);
    const newState = modalsSlice.reducer(initialState, action);

    expect(newState.showAuthModal).toEqual(showAuthModal);
  });
});