import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';
import MonthYearSelector from '../components/MonthYearSelector';
import { PieChart } from 'react-native-gifted-charts';
import tailwind from 'twrnc';
import { useExpense } from '../context/ExpenseContext';
import { processDataPieChart } from '../utils/helper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Insights = () => {
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

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === selectedDate.getMonth() &&
      expenseDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const pieChartData = processDataPieChart(filteredExpenses);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <MonthYearSelector
        date={selectedDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
      />
      <Text style={tailwind`text-2xl font-bold text-center text-gray-800 my-4`}>
        Spending Summary
      </Text>
      <View style={tailwind`items-center`}>
        {pieChartData.length > 0 ? (
          <PieChart
            data={pieChartData}
            donut
            showText
            textColor="white"
            textSize={14}
            fontWeight="bold"
          />
        ) : (
          <Text style={tailwind`text-lg text-gray-500 mt-10`}>
            No data available
          </Text>
        )}
      </View>
      <FlatList
        data={pieChartData}
        keyExtractor={item => item.name}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          return (
            <View
              style={tailwind`flex-row items-center justify-between p-4 border-b border-gray-200 mx-4`}
            >
              <View style={tailwind`flex-row items-center flex-1`}>
                <View
                  style={[
                    tailwind`w-4 h-4 rounded-full mr-3`,
                    { backgroundColor: item.color },
                  ]}
                />
                <Text style={tailwind`text-base font-medium text-gray-600`}>
                  {item.name}
                </Text>
              </View>
              <View style={tailwind`items-end`}>
                <Text style={tailwind`text-base font-bold text-black`}>
                  ₹{item.amount.toFixed(2)}
                </Text>
                <Text style={tailwind`text-sm text-gray-800`}>
                  {item.value}%
                </Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Insights;

const styles = StyleSheet.create({});
