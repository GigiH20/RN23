import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputScrollView from 'react-native-input-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const { height, width } = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';

function App() {
    const navigate = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const _handleLogin = async () => {
        console.log('dddd')
        try {
            // http code dau 2xx
            const payload = {
                "name": username,
                "pass": password
            }
            console.log('payload', payload)
            const { data } = await axios.post('http://localhost:3000/login', payload);
            AsyncStorage.setItem("token", data.token);
            AsyncStorage.setItem("user", JSON.stringify(data.user));
            navigate.navigate("Home")

        } catch (err) { // rest
            console.log('asdfasdf', err);
        }
    }

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            colors={['#642B73', '#3b5998', '#C6426E']}
            style={styles.linearGradient} >
            <InputScrollView>
                <View style={styles.wrap}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={e => {
                            console.log(e)
                            setUsername(e)
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="Password"
                        value={password}
                        onChangeText={e => setPassword(e)}
                    />
                    <BtnLiner text="Login000" onPress={() => _handleLogin()} />
                </View>
            </InputScrollView>
        </LinearGradient>
    );
}

const BtnLiner = ({ text = '', onPress }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            colors={['#f12711', '#f5af19']} style={stylesBtn.btn} >
            <TouchableOpacity onPress={onPress} style={stylesBtn.loginBtn}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </LinearGradient>
    )
};


const shawDowStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
}


const stylesBtn = StyleSheet.create({
    btn: {
        marginTop: 30,
        borderRadius: 10,
        ...shawDowStyle
    },
    loginBtn: {
        paddingVertical: 10,
        paddingHorizontal: 40,
    }
});


// Later on in your styles..
var styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
    },
    scrollView: {
        flex: 1,
        // alignItems: 'center', justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    wrap: {
        // width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height,
        // marginTop: 700,
    },
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 8,
        backgroundColor: '#fefefe',
        ...shawDowStyle
    },

});

export default App;
