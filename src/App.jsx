import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Income from "./Components/Income";
import Expenses from "./Components/Expense";
import Savings from "./Components/Saving";
import FinanceBreakdown from "./Components/FinanceBreakdown";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/saving" element={<Savings />} />
        <Route path="/breakdown" element={<FinanceBreakdown />} />
      </Routes>
    </div>
  );
}

export default App;
