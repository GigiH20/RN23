import * as React from 'react';
import {
    View, Text, StyleSheet, TextInput, Touchable,
    ActivityIndicator, Platform,
    TouchableOpacity, ScrollView, Dimensions, Button
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputScrollView from 'react-native-input-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import axios from 'axios';

const { height, width } = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
    const navigation = useNavigation()
    const [listUser, setListUser] = React.useState([]);

    const [loading, setLoading] = React.useState(false);


    const handleUploadData = (img) => {
        const formData = new FormData();
        console.log('handleUploadData+++img', img)
        // const url = img.uri;
        const url = Platform.OS === 'ios' ? img.uri.replace("file://", "") : img.uri;
        const val = {
            name: get(img, 'fileName', 'image.png'),
            type: img.type,
            uri: url,
        }
        console.log(img, 'val', val);
        formData.append('img', val);
        axios({
            method: "post",
            url: "http://localhost:3000/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log('responseeee', response.data);
            })
            .catch(function (response) {
                console.log('errrrr', response);
            });


    }
    const getListUser = async () => {
        try {
            setLoading(true)
            const token = await AsyncStorage.getItem("token");
            const { data } = await axios.get('http://localhost:3000/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('datadatadatadatadatadatadata', data)
            setListUser(data.data)
        } catch (err) {
            setListUser([])
            console.log('asdfasdfaf', err)
            alert('user request errors')
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 1000 * 2)
        }
    };

    React.useEffect(() => {
        getListUser();
    }, []);


    // 
    const _handleOpenCam = async () => {
        try {

            const options = {
                quality: 0.7,
            }
            const result = await launchCamera(options);
            const img = result.assets[0];
            handleUploadData(img)

        } catch (error) {
            console.log('error', error)
        }
    }
    const _handleSelectImage = async () => {
        try {

            const options = {
                quality: 0.7
            }
            const result = await launchImageLibrary(options);
            const img = result.assets[0];
            handleUploadData(img)

        } catch (err) {
            console.log('err', err)
        }
    }
    return (
        <LinearGradient
            start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
            colors={['#fff', '#aaa']}
            style={styles.linearGradient} >
            <SafeAreaView>

                <View style={{
                    flexDirection: 'row', marginTop: 10,
                    borderBottomColor: "#aaa", borderBottomWidth: 1,
                    justifyContent: 'space-between'
                }}>
                    <Text>{'name'}</Text>
                    <Text>{'age'}</Text>
                </View>
                {loading ? <ActivityIndicator size={'large'} /> : null}
                {
                    listUser[0] ?
                        listUser.map((item, index) => {
                            return (
                                <View style={{
                                    flexDirection: 'row', marginTop: 10,
                                    borderTopColor: "#aaa", borderTopWidth: 1,
                                    justifyContent: 'space-between'
                                }}>
                                    <Text>{item.name}</Text>
                                    <Text>{item.age}</Text>
                                </View>
                            )
                        }) : <Text>No data</Text>
                }
                <Button title='open camera' onPress={_handleOpenCam} />
                <Button title='select image' onPress={_handleSelectImage} />
                <Button title='logout' onPress={() => {
                    navigation.navigate("Login")
                }} />
            </SafeAreaView>
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
