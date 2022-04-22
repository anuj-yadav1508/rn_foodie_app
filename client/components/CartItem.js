import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';
import { Divider } from "react-native-elements";


const CartItem = props => {
    const total = props.itemData.item.selectedItems.reduce((acc, curr) => {
        return acc + curr.price
    },0).toFixed(2);
    
    return (
        <View style={styles.cartItem}>
            
                <View style={styles.resInfoContainer}>
                    <Text style={styles.resNameHeading}>Resturant Name: </Text>
                    <Text style={styles.resName}>{props.itemData.item.resturantName}</Text>
                </View>
                
            <View style={styles.itemsInfoContainer}>
                <Text style={styles.itemsHeading}>Items: </Text>
                <View style={styles.itemsWrapper}>
                    {
                        props.itemData.item.selectedItems.map(item => {
                            return (
                                <View style={styles.singleItem} key={item._id}>
                                    <View style={styles.singleItemLeft}>
                                        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
                                        <Text style={styles.singleItemName}>{item.name}</Text>
                                    </View>
                                    <View style={styles.singleItemRight}>
                                        <Text style={styles.singleItemPrice}>$ {item.price}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </View>

                <Divider width={3} color="#ccc" style={styles.divider} />

                <View style={styles.totalContainer}>
                    <Text style={styles.totalHeading}>Total: </Text>
                    <Text style={styles.total}>$ {total}</Text>
                </View>

                <View style={styles.orderContainer}>
                    <Text style={styles.order}>ORDER</Text>
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem: {
        flex: 1,
        backgroundColor: 'white',
        marginBottom: 15,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 6,
    },
    resInfoContainer: {
        flexDirection: 'row',
        marginVertical: 4,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    resNameHeading: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
    },
    resName: {
        fontFamily: 'open-sans',
        fontSize: 14,
        alignSelf: 'center',
        marginLeft: 4,
        marginTop: 2,
    },
    itemImage: {
        width: 40,
        height: 40,
        borderRadius: 6,
    },
    itemsInfoContainer: {
        marginHorizontal: 4,
    },
    itemsHeading: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        marginBottom: 8,
    },
    itemsWrapper: {

    },
    singleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    singleItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    singleItemRight: {
        alignItems: 'center',

    },
    singleItemName: {
        fontFamily: 'open-sans',
        fontSize: 15,
        marginLeft: 9,
    },
    singleItemPrice: {
        alignSelf: 'center',
        fontFamily: 'open-sans',
        fontSize: 15,
    },
    divider: {
        marginVertical: 5,
        width: '80%',
        alignSelf: 'center',
    },
    totalContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginVertical: 5,
    },
    totalHeading: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
    },
    total: {
        fontFamily: 'open-sans',
        fontSize: 14,
        paddingTop: 1,
        marginLeft: 5,
    },
    orderContainer: {
        alignSelf: 'center',
        width: '30%',
        backgroundColor: 'green',
        alignItems: 'center',
        paddingVertical: 4,
        marginTop: 5,
        marginBottom: 15,
        borderRadius: 6,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10, 
        elevation: 6,
    },
    order: {
        fontFamily: 'open-sans-bold',
        color: 'white',
        letterSpacing: 0.4,
    },
});

export default CartItem;