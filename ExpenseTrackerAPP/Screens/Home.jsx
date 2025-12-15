import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import MonthYearSelector from '../components/MonthYearSelector';
import tailwind from 'twrnc';
import EmptyList from '../components/EmptyList';
import ExpenseItemCard from '../components/ExpenseItemCard';
import { useExpense } from '../context/ExpenseContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  //use Context api
  const { expenses } = useExpense();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePrevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  // Filter expenses based on selected month and year
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedDate.getMonth() &&
      expenseDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  //sum all expense
  const totalSpent = filteredExpenses.reduce((sum, item) => sum + item.amount,0);

  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <MonthYearSelector
        date={selectedDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />
      <View style={tailwind`p-5 justify-center items-center`}>
        <Text style={tailwind`text-3xl font-bold text-black`}>Hello 👋</Text>
        <Text style={tailwind`text-sm text-gray-500 mt-2`}>
          Start Tracking Your Expense easily
        </Text>
      </View>

      {/* Summary Card */}
      <View
        style={tailwind`bg-black rounded-3xl p-6 my-2 mx-5 items-center shadow-lg`}
      >
        <Text style={tailwind`text-base text-gray-400`}>
          Spent in {selectedDate.toLocaleString('default', { month: 'long' })}
        </Text>
        <Text style={tailwind`text-base text-white text-4xl mt-2 font-bold`}>
          ₹{totalSpent.toFixed(2)}{' '}
        </Text>
      </View>

      <FlatList
        data={filteredExpenses}
        renderItem={({ item }) => <ExpenseItemCard item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={<EmptyList />}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
