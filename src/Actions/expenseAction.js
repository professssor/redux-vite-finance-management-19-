export const addExpense = (expenseObj) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://f-inance-app-redux-neog-assignment-19.professssor.repl.co/expense",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseObj),
      }
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "ADD_EXPENSE",
        payload: data.data,
      });
    } else {
      dispatch({
        type: "ADD_EXPENSE_FAILURE",
        payload: error.message,
      });
      throw new Error("Failed to add Expense");
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const fetchExpense = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://f-inance-app-redux-neog-assignment-19.professssor.repl.co/expense"
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "FETCH_EXPENSE_SUCCESS",
        payload: data.data,
      });
    } else {
      dispatch({
        type: "FETCH_EXPENSE_FAILURE",
        payload: error.message,
      });
      throw new Error("Failed to fetch expense");
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};
