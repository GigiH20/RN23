import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
// import { Header } from "react-native-elements";
import { NavigationContainer, useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const Headers = () => {
    const navigate = useNavigation();
    return (

        <View style={styles.container}>
            {/* <Header
       containerStyle= {styles.topHeader}
        rightComponent={<Image source={require('../../assets/icons/menu.png')} />}
      /> */}
            <Image source={require('../../../assets/img/banner.png')}
                resizeMode="stretch" style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.text}>WOMEN</Text>
                <Text style={[styles.text, { color: '#CECECF' }]}>•</Text>
                <Text style={[styles.text, { color: '#CECECF' }]}>SHOES</Text>
                <TouchableOpacity style={{ position: 'absolute', right: 0, alignSelf: 'center' }}
                    onPress={() => {
                        navigate.navigate("User")
                    }}>
                    <Image style={{ position: 'absolute', right: 0, alignSelf: 'center' }}

                        source={require('../../../assets/icons/menu.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.line}></View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        // height: '38%',
        marginBottom: 20
    },
    topHeader: {
        height: '5%',
        backgroundColor: '#FFF',
        paddingVertical: '5%',
    },
    image: {
        width: '100%'
    },
    textContainer: {
        flexDirection: 'row',
        marginVertical: '5%',
        marginHorizontal: '5%'
    },
    text: {
        // fontFamily: 'Anton-Regular',
        fontSize: 26,
        marginHorizontal: '1%',
    },
    line: {
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 2,
    }
});
export default Headers;