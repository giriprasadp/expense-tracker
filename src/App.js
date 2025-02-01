import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import PieChart from './components/PieChart';
import './styles.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  // Load expenses from localStorage on initial render
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    setExpenses(savedExpenses);
  }, []);

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // Calculate total monthly expenses
  const getMonthlyTotal = () => {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    return expenses
      .filter((expense) => expense.date.startsWith(currentMonth))
      .reduce((total, expense) => total + expense.amount, 0)
      .toFixed(2);
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <div className="summary">
        <h2>Monthly Summary</h2>
        <p>
          Total Expenses for {new Date().toLocaleString('default', { month: 'long' })}:{' '}
          <strong>₹{getMonthlyTotal()}</strong>
        </p>
      </div>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      <div className="chart">
        <h2>Spending by Category</h2>
        <PieChart expenses={expenses} />
      </div>
    </div>
  );
};

export default App;