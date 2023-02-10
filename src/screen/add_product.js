import * as React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InputScrollView from 'react-native-input-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'lodash';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const { height, width } = Dimensions.get('window');

import LinearGradient from 'react-native-linear-gradient';

function App() {
    const navigate = useNavigation();

    const [loading, setLoading] = React.useState(false);
    const [payload, setPayload] = React.useState({
        "name": '',
        "prices": '',
        "branch": '',
        'des': '',
        "img": '',
    });

    const _submit = async () => {
        try {
            if (!payload.name || !payload.prices) {
                Alert.alert("name and prices is required!");
                return 0;
            }
            setLoading(true);

            await axios.post('http://20.115.75.139:3465/product', payload);
            navigate.navigate("Home");
            setLoading(false);


        } catch (err) { // rest
            console.log('asdfasdf', err);
            setLoading(false);

        }
    }

    const handleUploadData = (img) => {
        const formData = new FormData();
        const url = Platform.OS === 'ios' ? img.uri.replace("file://", "") : img.uri;
        const val = {
            name: get(img, 'fileName', 'image.png'),
            type: img.type,
            uri: url,
        }
        formData.append('img', val);
        setLoading(true);
        axios({
            method: "post",
            url: "http://20.115.75.139:3465/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                payload.img = response?.data?.filename
                setPayload({ ...payload })

                setLoading(false);
            })
            .catch(function (response) {
                alert("Upload ảnh thất bại")
                setLoading(false);

            });



    }

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
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            colors={['#642B73', '#3b5998', '#C6426E']}
            style={styles.linearGradient} >
            <InputScrollView>
                <View style={styles.wrap}>
                    <View>
                        <Text style={styles.headerText}>Create new product</Text>
                        {loading ? <Text style={{color: '#fff', fontSize: 20}}>loading ...</Text> : null}
                    </View>
                    {[
                        "name",
                        "prices",
                        "branch",
                        'des',
                    ].map(i => (
                        <TextInput
                            style={styles.input}
                            placeholder={i}
                            value={payload[i]}
                            onChangeText={e => {
                                payload[i] = e;
                                setPayload({ ...payload });
                            }}
                        />)
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'stretch' }}>
                        <BtnLiner onPress={_handleSelectImage} colors={['#f2fcfe', '#fffcdc']} text="Chọn ảnh" />
                        <BtnLiner colors={['#1c92d2', '#f2fcfe']}
                            onPress={_handleOpenCam}
                            text="Chụp ảnh" />
                    </View>
                    <View>
                        {payload.img ? <Image style={{ height: width / 2, width: width / 2, marginTop: 10 }} source={{ uri: `http://20.115.75.139:3465/${payload.img}` }} /> : null}
                    </View>
                    <View style={{ marginTop: 50 }}>
                        <BtnLiner text="Submit" onPress={() => _submit()} />
                    </View>
                </View>
            </InputScrollView>
        </LinearGradient>
    );
}

const BtnLiner = ({ text = '', onPress, colors = ['#f12711', '#f5af19'] }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            colors={colors} style={stylesBtn.btn} >
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
        // justifyContent: 'center',
        height: height,
        marginTop: 100,
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
