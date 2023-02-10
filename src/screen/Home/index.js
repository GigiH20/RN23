import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import Content from "./Content";
import Headers from "./Header";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const App = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <Headers />
      <View style={{ flex: 1 }}>
        <Content />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("NewProduct")} style={{ position: 'absolute', bottom: 50, right: 30, backgroundColor: '#ddd', height: 60, width: 60, borderRadius: 60, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40, marginTop: -5 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
};


export default App;