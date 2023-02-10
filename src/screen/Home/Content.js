import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Text, Dimensions, FlatList } from "react-native";
const { height, width } = Dimensions.get('window');
// import { Text } from "react-native-elements";

const Shoes = props => {
    return (
        <TouchableOpacity style={styles.shoesContainer} >
            <View style={{ flex: 1 }}>
                <Image source={props.img} style={styles.shoesImg} />
            </View>
            <Text numberOfLines={1} style={styles.shoesText}>{props.children}</Text>
            <View opacity={0.4}>
                <Text numberOfLines={1} style={styles.shoesText}>{props.cost}</Text>
            </View>
            <View style={{ height: 7 }} />
            <TouchableOpacity onPress={() => {
                alert("đã thêm vào giỏ hàng thành công")
            }} style={{ position: 'absolute', top: 3, right: 3, backgroundColor: '#ddd', height: 35, width: 35, borderRadius: 35, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginTop: -5 }}>+</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

const Content = props => {
    const [listProduct, setListProduct] = useState([]);
    const [loading, setLoading] = useState(false)
    const getData = () => {
        setLoading(true)
        axios.get('http://20.115.75.139:3465/product')
            .then(({ data }) => {
                setLoading(false)
                console.log('asdfasdfasdf', data)
                setListProduct(data);
            })
            .catch(err => {
                setLoading(false)
            }
            )
    }

    useEffect(() => {
        getData();
    }, []);

    return (

        // 
        <FlatList
            ListHeaderComponent={() => <Text style={styles.text}>NEW SHOES</Text>}
            data={listProduct}
            onRefresh={getData}
            refreshing={loading}
            renderItem={({ item }) => <Shoes
                img={{ uri: `http://20.115.75.139:3465/${item.img}` }}
                cost={`${item.prices}`} onClick={props.onClick}>{item.name}</Shoes>}
            keyExtractor={item => `${item.id}-${item.name}`}
            numColumns={2}
        />



    );
}

{/* <View style={{ flexDirection: 'row' }}>
                <Shoes img={require('../../../assets/img/1.png')} cost="$180" onClick={props.onClick}>Nike Joyride Run Flyknit</Shoes>
                <Shoes img={require('../../../assets/img/2.png')} cost="$150">Nike Air Max 270 Bauhaus</Shoes>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Shoes img={require('../../../assets/img/3.png')} cost="$110">Nike Air Max Dia</Shoes>
                <Shoes img={require('../../../assets/img/4.png')} cost="$130">Nike Squidward Tentacles</Shoes>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Shoes img={require('../../../assets/img/5.png')} cost="$150">Nike Epic React Flynkit 2</Shoes>
                <Shoes img={require('../../../assets/img/6.png')} cost="$120">Nike Air Max Dia SE</Shoes>
            </View> */}

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

const styles = StyleSheet.create({
    text: {
        fontSize: 26,
        marginHorizontal: '5%',
    },
    shoesContainer: {
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 7,
        paddingHorizontal: 10,
        width: (width - 30) / 2,
        ...shawDowStyle,
    },
    shoesImg: {
        flex: 1,
        height: (width - 65) / 2,
        width: (width - 65) / 2,
        borderRadius: 9
    },
    shoesText: {
        fontSize: 16,
        numberOfLines: 1,
        color: 'red',
        // marginBottom: 9
    }
})
export default Content; 