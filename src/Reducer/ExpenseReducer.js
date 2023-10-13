const initialState = {
  expense: [],
  loading: false,
  error: null,
};

const ExpenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EXPENSE_SUCCESS":
      return {
        ...state,
        expense: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_EXPENSE_FAILURE":
      return {
        ...state,
        expense: [],
        loading: false,
        error: "Failed to fetch expense",
      };

    case "ADD_EXPENSE":
      return {
        ...state,
        expense: [...state.expense, action.payload],
        loading: false,
        error: null,
      };

    case "ADD_EXPENSE_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error adding expense",
      };

    default:
      return state;
  }
};

export { initialState };
export default ExpenseReducer;
