const initialState = {
  savings: [],
  loading: false,
  error: null,
};

const SavingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SAVING_SUCCESS":
      return {
        ...state,
        savings: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_SAVING_FAILURE":
      return {
        ...state,
        savings: [],
        loading: false,
        error: "Failed to fetch savings",
      };

    case "ADD_SAVING":
      return {
        ...state,
        savings: [...state.savings, action.payload],
        loading: false,
        error: null,
      };

    case "ADD_SAVING_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error adding saving",
      };

    default:
      return state;
  }
};

export { initialState };
export default SavingsReducer;
