import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <Link to="/income">
        <button style={buttonStyle}>Income</button>
      </Link>
      <Link to="/expense">
        <button style={buttonStyle}>Expenses</button>
      </Link>
      <Link to="/saving">
        <button style={buttonStyle}>Savings</button>
      </Link>

      <Link to="/breakdown">
        <button style={buttonStyle}>Finance breakdown</button>
      </Link>
      <Link to="https://github.com/professssor/redux-vite-finance-management-19-">
        <button style={(buttonStyle, { color: "green" })}>GITHUB</button>
      </Link>
    </div>
  );
};

const buttonStyle = {
  padding: "1rem",
  display: "inline",
  margin: "0.5rem",
};

export default Dashboard;
