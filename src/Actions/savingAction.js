export const addSaving = (savingObj) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://f-inance-app-redux-neog-assignment-19.professssor.repl.co/savings",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(savingObj),
      }
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "ADD_SAVING",
        payload: data.data,
      });
    } else {
      dispatch({
        type: "ADD_SAVING_FAILURE",
        payload: error.message,
      });
      throw new Error("Failed to add saving");
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};

export const fetchSavings = () => async (dispatch) => {
  try {
    const response = await fetch(
      "https://f-inance-app-redux-neog-assignment-19.professssor.repl.co/savings"
    );
    const data = await response.json();
    if (data.success) {
      dispatch({
        type: "FETCH_SAVING_SUCCESS",
        payload: data.data,
      });
    } else {
      dispatch({
        type: "FETCH_SAVING_FAILURE",
        payload: error.message,
      });
      throw new Error("Failed to fetch saving");
    }
  } catch (error) {
    throw new Error("Internal server error");
  }
};
