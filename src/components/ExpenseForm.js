import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const categories = [
    'Food',
    'Transport',
    'Rent',
    'Entertainment',
    'Utilities',
    'Shopping',
    'Other',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category || !date) {
      alert('Please fill in all fields');
      return;
    }
    const newExpense = {
      id: Math.random().toString(),
      amount: parseFloat(amount),
      category,
      date,
      note,
    };
    addExpense(newExpense);
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="" disabled>Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;