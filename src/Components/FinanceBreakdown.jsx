import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpense } from "../Actions/expenseAction";
import { fetchIncome } from "../Actions/IncomeAction";
import { fetchSavings } from "../Actions/savingAction";

function FinanceBreakdown() {
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.SavingsReducer.savings);
  const expenses = useSelector((state) => state.ExpenseReducer.expense);
  const incomes = useSelector((state) => state.IncomeReducer.income);

  useEffect(() => {
    dispatch(fetchExpense());
    dispatch(fetchIncome());
    dispatch(fetchSavings());
  }, [dispatch]);

  const [selectedOption, setSelectedOption] = useState("incomeVsExpenses");
  const [reportContent, setReportContent] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleExpenseVsIncome = () => {
    const totalIncome = incomes.reduce((acc, income) => acc + income.amount, 0);
    const totalExpenses = expenses.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const savings = totalIncome - totalExpenses;
    setReportContent(
      <div>
        <p>Total Income: ${totalIncome}</p>
        <p>Total Expenses: ${totalExpenses}</p>
        <p>Savings: ${savings}</p>
      </div>
    );
  };

  const handleExpenseByCategory = () => {
    console.log(expenses);
    const value = expenses.reduce(
      (acc, curr) => {
        if (curr.category === "Category1") {
          acc.category1 = acc.category1 + curr.amount;
        }
        if (curr.category === "Category2") {
          acc.category2 = acc.category2 + curr.amount;
        }
        return acc;
      },
      { category1: 0, category2: 0 }
    );

    setReportContent(
      <>
        <p>here is the expense breakdown by category</p>
        <h4>category1: 💲{value.category1}</h4>
        <h4>category2:💲{value.category2}</h4>
      </>
    );
  };

  const handleGenerateReport = () => {
    if (selectedOption === "incomeVsExpenses") {
      handleExpenseVsIncome();
    }

    if (selectedOption === "expenseByCategory") {
      handleExpenseByCategory();
    } else {
      console.log("some error performing the provided ask");
    }
  };

  return (
    <div>
      <h2>Finance Breakdown</h2>
      <label>Select a report type:</label>
      <select onChange={handleSelectChange} value={selectedOption}>
        <option value="incomeVsExpenses">Income vs. Expenses</option>
        <option value="expenseByCategory">Expense Breakdown</option>
      </select>
      <button onClick={handleGenerateReport}>Generate Report</button>

      <div>{reportContent}</div>
    </div>
  );
}

export default FinanceBreakdown;
