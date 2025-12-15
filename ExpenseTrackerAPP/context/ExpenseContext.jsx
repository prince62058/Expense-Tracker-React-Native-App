import { createContext, useContext, useEffect, useState } from 'react';
import { getCategoryColor, getId } from '../utils/helper';
import { getDate } from '../utils/helper';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ExpenseContext = createContext();

//Create a funtion and take a children as a promps

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpense] = useState([]);

  //AsyncStorage use to save data and load data after application reopen

  //Get Data from storage
  useEffect(() => {
    const getData = async () => {
      try {
        let storedExpenses = await AsyncStorage.getItem('expensesList');
        if (storedExpenses !== null) {
          setExpense(JSON.parse(storedExpenses));
        }
      } catch (error) {
        Alert.alert('Failed to load expense from storage', error.message);
      }
    };

    getData();
  }, []);

  //Save Data from Storage
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('expensesList', JSON.stringify(expenses));
      } catch (error) {
        Alert.alert('Failed to save expense to storage', error.message);
      }
    };

    saveData();
  }, [expenses]);

  //Add Expensehandle

  const addExpense = expense => {
    const newExpense = {
      id: getId(),
      title: expense.title,
      amount: Number(expense.amount),
      category: expense.category.name,
      date: getDate(),
      color: getCategoryColor(expense.category.color),
      icon: expense.category.icon,
    };
    //update Expense list
    setExpense([...expenses, newExpense]);
  };

  const deleteExpense = id => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpense(updatedExpenses);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

//useContext - Directly Context ka data access karne ke liye
export const useExpense = () => useContext(ExpenseContext);
