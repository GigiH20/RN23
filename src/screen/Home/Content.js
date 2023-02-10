import React from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity,Text  } from "react-native";
// import { Text } from "react-native-elements";

const Shoes = props => {
   return (
    <TouchableOpacity style={styles.shoesContainer} onPress = {props.onClick}>
        <Image source={props.img} style = {styles.shoesImg}/>
        <Text style={styles.shoesText}>{props.children}</Text>
        <View opacity={0.4}>
            <Text style={styles.shoesText}>{props.cost}</Text>
        </View>
    </TouchableOpacity>
   ) 
}

const Content = props => {
    return (
        <ScrollView >
            <Text style={styles.text}>NEW SHOES</Text>
            <View style = {{flexDirection: 'row'}}>
                <Shoes img = {require('../../../assets/img/1.png')} cost="$180" onClick={props.onClick}>Nike Joyride Run Flyknit</Shoes>
                <Shoes img = {require('../../../assets/img/2.png')} cost="$150">Nike Air Max 270 Bauhaus</Shoes>
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Shoes img={require('../../../assets/img/3.png')} cost="$110">Nike Air Max Dia</Shoes>
                <Shoes img={require('../../../assets/img/4.png')} cost="$130">Nike Squidward Tentacles</Shoes>
            </View>
            <View style = {{flexDirection: 'row'}}>
                <Shoes img={require('../../../assets/img/5.png')} cost="$150">Nike Epic React Flynkit 2</Shoes>
                <Shoes img={require('../../../assets/img/6.png')} cost="$120">Nike Air Max Dia SE</Shoes>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create ({
    text: {
        fontSize: 26, 
        marginHorizontal: '5%'
    },
    shoesContainer: {
        paddingVertical: '2%',
        marginHorizontal: '5%'
    },
    shoesImg: {
        width: 175,
        height: 175
    },
    shoesText: {
        fontSize: 16
    }
})
 export default Content; 