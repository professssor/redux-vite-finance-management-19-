export const addIncome = (incomeObj) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://f-inance-app-redux-neog-assignment-19.professssor.repl.co/income",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(incomeObj),
      }
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "ADD_INCOME",
        payload: data.data,
      });
    } else {
      dispatch({
        type: "ADD_INCOME_FAILURE",
        payload: error.message,
      });
      throw new Error("Failed to add income");
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const fetchIncome = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://f-inance-app-redux-neog-assignment-19.professssor.repl.co/income"
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "FETCH_INCOME_SUCCESS",
        payload: data.data,
      });
    } else {
      dispatch({
        type: "FETCH_INCOME_FAILURE",
        payload: error.message,
      });
      throw new Error("Failed to fetch income");
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};
