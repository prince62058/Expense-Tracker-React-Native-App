import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import tailwind from 'twrnc';

const MonthYearSelector = ({ date, onPrev, onNext }) => {
  const formattedDate = date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <View style={tailwind`flex-row items-center justify-center py-4`}>
      <TouchableOpacity
        onPress={onPrev}
        style={tailwind`p-2 bg-gray-200 rounded-full mr-4`}
      >
        <Text style={tailwind`text-lg font-bold text-gray-600`}>{'<'}</Text>
      </TouchableOpacity>

      <View style={tailwind`bg-black px-6 py-2 rounded-full`}>
        <Text style={tailwind`text-lg font-bold text-white`}>
          {formattedDate}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onNext}
        style={tailwind`p-2 bg-gray-200 rounded-full ml-4`}
      >
        <Text style={tailwind`text-lg font-bold text-gray-600`}>{'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MonthYearSelector;

const styles = StyleSheet.create({});
