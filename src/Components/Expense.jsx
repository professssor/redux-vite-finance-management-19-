// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addExpense, fetchExpenses } from "../Actions/ExpenseAction";

import { useDispatch, useSelector } from "react-redux";
import { addExpense, fetchExpense } from "../Actions/expenseAction";
import React, { useEffect, useState } from "react";

const cardStyle = {
  backgroundColor: "#272829",
  display: "inline",
  padding: "1rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const buttonStyle = {
  padding: "1rem",
  display: "block",
  margin: "0 auto",
};

const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.ExpenseReducer.expense);
  useEffect(() => {
    dispatch(fetchExpense());
  }, [dispatch]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("");
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseArray, setExpenseArray] = useState([]);

  // Use effect to continuously update the local copy of expense array with the latest value fetched using useSelector
  useEffect(() => {
    setExpenseArray(expenses);
  }, [expenses]);

  const handleAddExpense = (e) => {
    e.preventDefault();

    const expenseObj = {
      category: selectedCategory,
      description: description,
      amount: amount,
      date: date,
    };
    if (
      expenseObj.amount.length > 0 &&
      expenseObj.category.length > 0 &&
      expenseObj.date.length > 0 &&
      expenseObj.description.length > 0
    ) {
      dispatch(addExpense(expenseObj));
      setShowAddExpenseModal(false);
    } else {
      console.log("Fill out all the required fields");
    }
  };

  const openAddExpenseModal = () => {
    setShowAddExpenseModal(true);
  };

  const closeAddExpenseModal = () => {
    setShowAddExpenseModal(false);
  };

  const transform = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
  };

  const sortExpenseByAmount = () => {
    const sortedArr = expenses.sort((a, b) => b.amount - a.amount);

    setExpenseArray([...sortedArr]);
  };

  const handleFilterByCategory = (e) => {
    e.preventDefault();
    const categorySelected = e.target.value;
    // Show all the categories
    if (categorySelected === "both") setExpenseArray(expenses);
    else {
      const filteredArray = expenses.filter((singleExpense) => {
        return singleExpense.category === categorySelected;
      });

      setExpenseArray(filteredArray);
    }
  };

  // Calculate the total expense
  const totalExpense = expenses.reduce((acc, curr) => {
    return Number(curr.amount) + acc;
  }, 0);

  return (
    <div className="expenses-container" style={transform}>
      <h1>Expense Management</h1>

      <div>
        <button onClick={openAddExpenseModal} style={buttonStyle}>
          Add Expense
        </button>

        <label htmlFor="sortByAmount">Sort by Amount </label>
        <input
          id="sortByAmount"
          type="checkbox"
          onChange={sortExpenseByAmount}
        />
        <label htmlFor="filterByCategory">Filter by Category</label>
        <select
          id="filterByCategory"
          onChange={(e) => handleFilterByCategory(e)}
        >
          <option value="both">Both</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
        </select>
      </div>

      {showAddExpenseModal && (
        <div style={cardStyle}>
          <form>
            <h2>Add New Expense</h2>
            <div>
              <label htmlFor="expenseDescription">Description:</label>
              <input
                type="text"
                id="expenseDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="expenseAmount">Amount:</label>
              <input
                type="number"
                id="expenseAmount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="expenseDate">Date:</label>
              <input
                type="date"
                id="expenseDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="expenseCategory">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                name="expenseCategory"
                id=""
                required
              >
                <option value="">Select Category</option>
                <option value="Category1">Category 1</option>
                <option value="Category2">Category 2</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleAddExpense}
              style={{
                marginTop: "1rem",
                padding: ".4rem",
                backgroundColor: "green",
                color: "white",
                width: "100%",
              }}
            >
              Add Expense
            </button>
            <button
              type="button"
              onClick={closeAddExpenseModal}
              style={{
                marginTop: "1rem",
                padding: ".4rem",
                backgroundColor: "red",
                color: "white",
                width: "100%",
              }}
            >
              Close
            </button>
          </form>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {expenseArray?.length === 0 && <h4>Data is being fetched</h4>}
        {expenseArray?.map((expense, index) => (
          <div
            key={index}
            style={{
              border: "2px solid white ",
              borderRadius: "5px",
              marginTop: "1rem",
              flex: "1",
              margin: "0.5rem",
            }}
          >
            {" "}
            <p>Description: {expense.description}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {expense.date}</p>
            <h4>Amount: {expense.amount}</h4>
          </div>
        ))}
      </div>
      <h2>Total Expenses: {totalExpense}</h2>
    </div>
  );
};

export default Expenses;
