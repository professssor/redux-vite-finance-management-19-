import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addIncome, fetchIncome } from "../Actions/IncomeAction";

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

const Income = () => {
  const dispatch = useDispatch();
  const incomes = useSelector((state) => state.IncomeReducer.income);
  useEffect(() => {
    dispatch(fetchIncome());
  }, [dispatch]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("");
  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [incomeArray, setIncomeArray] = useState([]);

  // use effect to continously update the local copy of income array with latest value fetched using useSelector
  useEffect(() => {
    setIncomeArray(incomes);
  }, [incomes]);

  const handleAddIncome = (e) => {
    e.preventDefault();

    const incomeObj = {
      category: selectedCategory,
      description: description,
      amount: amount,
      date: date,
    };
    if (
      incomeObj.amount.length > 0 &&
      incomeObj.category.length > 0 &&
      incomeObj.date.length > 0 &&
      incomeObj.description.length > 0
    ) {
      dispatch(addIncome(incomeObj));
      setShowAddIncomeModal(false);
    } else {
      console.log("fill out all the required fields");
    }
  };

  const openAddIncomeModal = () => {
    setShowAddIncomeModal(true);
  };

  const closeAddIncomeModal = () => {
    setShowAddIncomeModal(false);
  };

  const transform = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
  };

  const sortIncomeByAmount = () => {
    const sortedArr = incomes.sort((a, b) => b.amount - a.amount);

    setIncomeArray([...sortedArr]);
  };
  const handlefilterByCategory = (e) => {
    e.preventDefault();
    const categorySelected = e.target.value;
    // show all the categories
    if (categorySelected === "both") setIncomeArray(incomes);
    else {
      const filteredArray = incomes.filter((singleIncome) => {
        return singleIncome.category === categorySelected;
      });

      setIncomeArray(filteredArray);
    }
  };
  //will fetch us the total income
  const totalIncome = incomes.reduce((acc, curr) => {
    return Number(curr.amount) + acc;
  }, 0);

  return (
    <div className="income-container" style={transform}>
      <h1>Income Management</h1>

      <div>
        <button onClick={openAddIncomeModal} style={buttonStyle}>
          Add Income
        </button>

        <label htmlFor="sortByAmout">Sort by Amount </label>
        <input id="sortByAmout" type="checkbox" onChange={sortIncomeByAmount} />
        <label htmlFor="filterByCategory">filter by category</label>
        <select
          id="filterByCategory"
          onChange={(e) => handlefilterByCategory(e)}
        >
          <option value="both">both</option>
          <option value="Category1">Category 1</option>
          <option value="Category2">Category 2</option>
        </select>
      </div>

      {showAddIncomeModal && (
        <div style={cardStyle}>
          <form>
            <h2>Add New Income</h2>
            <div>
              <label htmlFor="incomeDescription">Description:</label>
              <input
                type="text"
                id="incomeDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="incomeAmount">Amount:</label>
              <input
                type="number"
                id="incomeAmount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="incomeDate">Date:</label>
              <input
                type="date"
                id="incomeDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="incomeCategory">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                name="incomeCategory"
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
              onClick={handleAddIncome}
              style={{
                marginTop: "1rem",
                padding: ".4rem",
                backgroundColor: "green",
                color: "white",
                width: "100%",
              }}
            >
              Add Income
            </button>
            <button
              type="button"
              onClick={closeAddIncomeModal}
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
        {incomeArray?.length === 0 && <h4>Data is being fetched</h4>}
        {incomeArray?.map((income, index) => (
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
            <h4>Amount: {income.amount}</h4>
            <p>Category: {income.category}</p>
            <p>Date: {income.date}</p>
            <p>Description: {income.description}</p>
          </div>
        ))}
      </div>
      <h2>Total Added Income : {totalIncome}</h2>
    </div>
  );
};

export default Income;
