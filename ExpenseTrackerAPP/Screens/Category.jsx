import { Alert, FlatList, Pressable } from 'react-native';
import { Text, View } from 'react-native';
import tailwind from 'twrnc';
import { CATEGORIES } from '../utils/CategoryJsonData';
const Category = ({ navigation }) => {

  //Handle Category
  const handleSelectedCatgory=(category)=>{
     console.log("Selected category" , category)

     navigation.popTo("BottomTabs",{
      screen:'Create',
      params:{category}
     });
  }



  return (
    <View>
      {/* Close Modal */}
      <View style={tailwind`p-5 mt-10`}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={tailwind`text-2xl font-bold`}>X</Text>
        </Pressable>
        {/* Text */}
        <Text style={tailwind`text-3xl font-bold text-black mt-4`}>
          Select Category
        </Text>
        <Text style={tailwind`text-base  text-gray-500 mt-2 mb-4`}>
          Select a Category that best describes what you spent money on
        </Text>
      </View>

      {/* FlatList */}
      <FlatList
        numColumns={2}
        data={CATEGORIES}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ padding: 20, gap: 12, paddingBottom: 100 }}
        keyExtractor={item => item.name}
        renderItem={({ item }) => {
          return (
            <Pressable style={tailwind`flex-1 p-4 bg-white rounded-2xl border border-gray-200 justify-center items-center shadow-sm h-32`} onPress={()=>handleSelectedCatgory(item)}>
              <View style={tailwind`bg-[${item.color}] p-3 rounded-full mb-2`}>
                <Text style={tailwind`text-2xl`}>{item.icon}</Text>
              </View>
              <Text style={tailwind`text-sm font-semibold text-center text-gray-700`}>
                {item.name}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default Category;
