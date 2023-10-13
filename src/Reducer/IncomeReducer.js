const initialState = {
  income: [],
  loading: false,
  error: null,
};
const IncomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_INCOME_SUCCESS":
      return {
        ...state,
        income: action.payload,
        loading: false,
        error: null,
      };

    case "FETCH_INCOME_FAILURE":
      return {
        ...state,
        income: [],
        loading: false,
        error: "failed to fetch income",
      };

    case "ADD_INCOME":
      return {
        ...state,
        income: [...state.income, action.payload],
        loading: false,
        error: null,
      };

    case "ADD_INCOME_FAILURE":
      return { ...state, loading: false, error: "Error Adding data" };

    case "REMOVE_FAILURE":
      const afterRemovalIncomeArray = state.income.filter(
        (income) => income._id !== action.payload
      );
      return {
        ...state,
        income: [...afterRemovalIncomeArray],
        loading: false,
        error: null,
      };

    case "REMOVE_INCOME_FAILURE":
      return {
        ...state,
        loading: false,
        error: "Error removing income from list",
      };
    default:
      return state;
  }
};
export { initialState };

export default IncomeReducer;
