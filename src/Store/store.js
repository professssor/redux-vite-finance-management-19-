import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux"; // Import compose
import thunk from "redux-thunk";
import IncomeReducer from "../Reducer/IncomeReducer";
import ExpenseReducer from "../Reducer/ExpenseReducer";
import SavingsReducer from "../Reducer/SavingsReducer";
// Combine your reducers into a single root reducer
const rootReducer = combineReducers({
  IncomeReducer,
  ExpenseReducer,
  SavingsReducer,

  //   FoodReducer,
  //   GoalTrackReducer,
});

// Define your enhancers (e.g., Redux DevTools Extension and thunk middleware)
const enhancers = [
  applyMiddleware(thunk),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
];

const composedEnhancers = compose(...enhancers); // Combine enhancers using compose

const store = createStore(rootReducer, composedEnhancers);

store.subscribe(() => console.log(store.getState()));

export default store;
