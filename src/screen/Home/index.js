import React from "react";
import { View, Text, SafeAreaView, StyleSheet,Dimensions,Image,TouchableOpacity } from "react-native";
import Content from "./Content";
import Headers from "./Header";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const App = () => {
  const navigate = useNavigation();
  return (
    <View>
      <Headers/>
      <TouchableOpacity onPress={() => {
                        navigate.navigate("Login")
                    }}    >
         <Text>Log out</Text>
      </TouchableOpacity>
      <Content/>
      {/* <Content/> */}

    </View>
  );
};


export default App;