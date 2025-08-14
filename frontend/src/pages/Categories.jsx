import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = ({ token, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCategories(res.data);
    } catch {
      setError('Failed to fetch categories');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/categories/add`, { category: newCategory }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewCategory('');
      fetchCategories();
      if (onCategoryChange) onCategoryChange();
    } catch {
      setError('Failed to add category');
    }
  };

  const handleDelete = async (category) => {
    if (window.confirm('Delete this category?')) {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/categories/delete`, { category }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCategories();
      if (onCategoryChange) onCategoryChange();
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', padding: 20, borderRadius: 8 }}>
      <h2>Manage Categories</h2>
      <form onSubmit={handleAdd}>
        <input type="text" placeholder="New Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} required />
        <button type="submit">Add</button>
      </form>
      <ul style={{ marginTop: 20 }}>
        {categories.map((cat, idx) => (
          <li key={idx}>
            {cat} <button onClick={() => handleDelete(cat)} style={{ color: 'red' }}>Delete</button>
          </li>
        ))}
      </ul>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Categories;
