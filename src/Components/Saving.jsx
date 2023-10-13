import { useDispatch, useSelector } from "react-redux";
import { addSaving, fetchSavings } from "../Actions/savingAction";
import { useState, useEffect } from "react";

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

const Savings = () => {
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.SavingsReducer.savings);
  useEffect(() => {
    dispatch(fetchSavings());
    console.log("this is checked");
  }, [dispatch]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [date, setDate] = useState("");
  const [showAddSavingModal, setShowAddSavingModal] = useState(false);
  const [savingArray, setSavingArray] = useState([]);

  // Use effect to continuously update the local copy of savings array with the latest value fetched using useSelector
  useEffect(() => {
    setSavingArray(savings);
  }, [savings]);

  const handleAddSaving = (e) => {
    e.preventDefault();

    const savingObj = {
      category: selectedCategory,
      description: description,
      amount: amount,
      date: date,
    };
    if (
      savingObj.amount.length > 0 &&
      savingObj.category.length > 0 &&
      savingObj.date.length > 0 &&
      savingObj.description.length > 0
    ) {
      dispatch(addSaving(savingObj));
      setShowAddSavingModal(false);
    } else {
      console.log("Fill out all the required fields");
    }
  };

  const openAddSavingModal = () => {
    setShowAddSavingModal(true);
  };

  const closeAddSavingModal = () => {
    setShowAddSavingModal(false);
  };

  const transform = {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    textAlign: "center",
  };

  const sortSavingsByAmount = () => {
    const sortedArr = savings.sort((a, b) => b.amount - a.amount);

    setSavingArray([...sortedArr]);
  };

  const handleFilterByCategory = (e) => {
    e.preventDefault();
    const categorySelected = e.target.value;
    // Show all the categories
    if (categorySelected === "both") setSavingArray(savings);
    else {
      const filteredArray = savings.filter((singleSaving) => {
        return singleSaving.category === categorySelected;
      });

      setSavingArray(filteredArray);
    }
  };

  // Calculate the total savings
  const totalSavings = savings.reduce((acc, curr) => {
    return Number(curr.amount) + acc;
  }, 0);

  return (
    <div className="savings-container" style={transform}>
      <h1>Savings Management</h1>

      <div>
        <button onClick={openAddSavingModal} style={buttonStyle}>
          Add Saving
        </button>

        <label htmlFor="sortByAmount">Sort by Amount </label>
        <input
          id="sortByAmount"
          type="checkbox"
          onChange={sortSavingsByAmount}
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

      {showAddSavingModal && (
        <div style={cardStyle}>
          <form>
            <h2>Add New Saving</h2>
            <div>
              <label htmlFor="savingDescription">Description:</label>
              <input
                type="text"
                id="savingDescription"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="savingAmount">Amount:</label>
              <input
                type="number"
                id="savingAmount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="savingDate">Date:</label>
              <input
                type="date"
                id="savingDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: "100%", padding: ".4rem" }}
                required
              />
            </div>
            <div>
              <label htmlFor="savingCategory">Category:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                name="savingCategory"
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
              onClick={handleAddSaving}
              style={{
                marginTop: "1rem",
                padding: ".4rem",
                backgroundColor: "green",
                color: "white",
                width: "100%",
              }}
            >
              Add Saving
            </button>
            <button
              type="button"
              onClick={closeAddSavingModal}
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
        {savingArray?.length === 0 && <h4>Data is being fetched</h4>}
        {savingArray?.map((saving, index) => (
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
            <p>Description: {saving.description}</p>
            <h4>Amount: {saving.amount}</h4>
            <p>Category: {saving.category}</p>
            <p>Date: {saving.date}</p>
          </div>
        ))}
      </div>
      <h2>Total Savings: {totalSavings}</h2>
    </div>
  );
};

export default Savings;
