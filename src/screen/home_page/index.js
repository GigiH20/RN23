import React from "react";
import { View, Text, SafeAreaView, StyleSheet,Dimensions,Image } from "react-native";
import Content from "./content";
import Headers from "./header";
const { height, width } = Dimensions.get('window');

const App = () => {
  return (
    <View>
      <Headers/>
      {/* <Content/> */}
    </View>
  );
};


export default App;