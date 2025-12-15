import { StyleSheet, Text, View, Pressable, Alert } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import { useExpense } from '../context/ExpenseContext';

const ExpenseItemCard = ({ item }) => {
  const { deleteExpense } = useExpense();

  const handleDelete = () => {
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteExpense(item.id),
        },
      ],
    );
  };

  return (
    <View
      style={tailwind`bg-white rounded-2xl p-4 mx-5 mb-3 flex-row justify-between items-center shadow-sm`}
    >
      <View style={tailwind`flex-row items-center flex-1`}>
        {/* Icon */}
        <View
          style={tailwind`w-12 h-12 rounded-xl items-center justify-center bg-gray-100 mr-4`}
        >
          <Text style={tailwind`text-3xl`}>{item.icon}</Text>
        </View>
        {/* Title */}
        <View style={tailwind`flex-1`}>
          <Text
            style={tailwind`text-base font-bold text-gray-800`}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          {/* Category */}
          <View
            style={[
              tailwind`mt-1 rounded-lg p-2 self-start`,
              { backgroundColor: item.color },
            ]}
          >
            <Text style={tailwind`text-xs font-bold text-gray-700`}>
              {item.category}
            </Text>
          </View>
        </View>
      </View>

      {/* Amount and Date */}
      <View style={tailwind`items-end mr-2`}>
        <Text style={tailwind`text-base font-bold text-black text-xl`}>
          {'₹' + item.amount}
        </Text>
        <Text style={tailwind`text-xs text-gray-800 font-semibold`}>
          {new Date(item.date).toLocaleString()}
        </Text>
      </View>

      {/* Delete Button */}
      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => [
          tailwind`p-2`,
          pressed && tailwind`opacity-50`,
        ]}
      >
        <Text style={tailwind`text-xl`}>🗑️</Text>
      </Pressable>
    </View>
  );
};

export default ExpenseItemCard;

const styles = StyleSheet.create({});
