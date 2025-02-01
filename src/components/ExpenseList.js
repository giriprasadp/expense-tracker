import React, { useState } from 'react';

const ExpenseList = ({ expenses, deleteExpense }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Sort expenses
  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date);
    if (sortBy === 'amount') return a.amount - b.amount;
    if (sortBy === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  // Filter expenses by date range
  const filteredExpenses = sortedExpenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (
      (!start || expenseDate >= start) &&
      (!end || expenseDate <= end)
    );
  });

  return (
    <div className="expense-list">
      <button
        className="toggle-button"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 'Show Expenses' : 'Hide Expenses'}
      </button>

      {!isCollapsed && (
        <>
          <div className="filters">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Sort by Date</option>
              <option value="amount">Sort by Amount</option>
              <option value="category">Sort by Category</option>
            </select>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>

          {filteredExpenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="expense-item">
                <span>
                  ₹{expense.amount} - {expense.category} - {expense.date} - {expense.note}
                </span>
                <button
                  className="delete-button"
                  onClick={() => deleteExpense(expense.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseList;