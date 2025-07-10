import axios from 'axios';

const API = `${process.env.REACT_APP_API_BASE_URL}/transactions`;

export const getTransactions = async () => {
  try {
    const res = await axios.get(API);
    return res.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
};

export const addTransaction = async (data) => {
  try {
    const res = await axios.post(API, data);
    return res.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
  }
};
