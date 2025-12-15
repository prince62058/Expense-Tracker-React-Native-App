import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from 'twrnc';
import { useExpense } from '../context/ExpenseContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const Create = ({ navigation, route }) => {
  //use Context api
  //use Context api
  const { addExpense } = useExpense();

  const [amount, setAmount] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setcategory] = useState({});

  //useEffect in handle selected category

  useEffect(() => {
    if (route.params?.category) {
      //do somethings
      console.log('params', route.params?.category);
      setcategory(route.params?.category);
    }
  }, [route.params?.category]);

  //Handle Submit
  const handleAddExpense = () => {
    if (!amount || !title || category.name == null) {
      Alert.alert('Validation', 'All fields are required');
      return;
    }
    addExpense({
      title,
      amount,
      category,
    });
    setAmount(null);
    setTitle('');
    setcategory({});

    navigation.goBack();
  };

  //Handle Category Input
  const handleCategoryInput = () => {
    navigation.navigate('Category');
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={tailwind`p-6`}>
        {/* Header Section */}
        <Text style={tailwind`text-3xl font-bold text-black`}>
          {' '}
          Add New Expense
        </Text>
        <Text style={tailwind`text-gray-500 text-base mt-2 mb-8`}>
          Enter the details of your expense to help you track your spending.
        </Text>

        {/* Expense From Section */}
        <View style={tailwind`mb-5`}>
          <Text style={tailwind`text-lg font-semibold text-gray-500 mb-2`}>
            Enter Amount
          </Text>
          {/* Ist TextInput */}
          <TextInput
            placeholder="₹0.00"
            style={tailwind`border-2 border-gray-300 p-4 rounded-xl text-lg`}
            value={amount}
            onChangeText={setAmount}
          />
          {/* 2nd TextInput */}
          <View style={tailwind`mt-4`}>
            <Text style={tailwind`text-lg font-semibold text-gray-500 mb-2`}>
              Title
            </Text>
            <TextInput
              placeholder="What was it for ..?"
              style={tailwind`border-2 border-gray-300 p-4 rounded-xl text-lg`}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* 3rd input Category */}
          <View style={tailwind`mt-4`}>
            <Text style={tailwind`text-lg font-semibold text-gray-500 mb-2`}>
              Category
            </Text>
            <Pressable
              style={tailwind`border border-gray-400 rounded-xl flex-row p-6 justify-between items-center`}
              onPress={handleCategoryInput}
            >
              <View style={tailwind`flex-row items-center`}>
                <Text style={tailwind`text-3xl mr-3`}>
                  {category.icon || '🍔'}
                </Text>
                <Text style={tailwind`text-lg`}>{category.name || 'Food'}</Text>
              </View>
              <Text style={tailwind`text-lg font-bold`}>＞</Text>
            </Pressable>
          </View>
        </View>
        {/* Footer Section */}

        <Pressable
          style={tailwind`bg-black p-6 rounded-lg mt-8`}
          onPress={handleAddExpense}
        >
          <Text style={tailwind`text-white text-center text-lg font-bold`}>
            Add Expense
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
