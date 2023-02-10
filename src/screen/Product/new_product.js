import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Touchable, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
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
    const [age, setAge] = React.useState('');


    const _submit = async () => {
        try {
            // http code dau 2xx
            const payload = {
                "name": username,
                "pass": password,
                "age": age
            }
            if(!username || !password) {
                Alert.alert("username and password is required!");
                return 0;
            }

            const { data } = await axios.post('http://20.115.75.139:3465/user', payload);
            console.log('asdfasdfasdf',data)
            navigate.navigate("Login")

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
                    <View>
                        <Text style={styles.headerText}>Create account</Text>
                    </View>
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
                    <TextInput
                        style={styles.input}
                        placeholder="Age"
                        value={age}
                        keyboardType='numeric'
                        onChangeText={e => setAge(e)}
                    />
                    <BtnLiner text="Create account" onPress={() => _submit()} />

                    <TouchableOpacity onPress={() => {
                        navigate.navigate("Login")
                    }} style={styles.register}>
                        <Text style={styles.registerText}>Login</Text>
                    </TouchableOpacity>
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
        // marginTop: 400,
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
    register: {
        marginTop: 20,
    },
    registerText: {
        color: '#fff',
    },
    headerText: {
        fontSize: 25,
        marginBottom: 15,
        color: '#fff'
    }

});

export default App;


