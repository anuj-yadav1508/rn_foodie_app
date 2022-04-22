import React from "react";
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { Divider } from "react-native-elements";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";

import { CARTITEMS } from "../../data/dummy-data";
import CartItem from "../../components/CartItem";

const CartScreen = props => {
    const cartItems = useSelector(state => state.cart.items);

    const CartRenderItem = itemData => {
        return (
            <CartItem itemData={itemData} />
        )
    };
    return (
        <View style={styles.screen}>
            <View style={styles.itemWrapper}>
                <View style={styles.itemCountContainer}>
                    <Text style={styles.itemCountHeading}>Total Items: </Text>
                    <Text style={styles.itemCount}>{cartItems.length}</Text>
                </View>
                <View style={styles.dividerContainer}>
                    <Divider width={2} color="#444" style={styles.divider} />
                </View>
            </View>

            {cartItems.length === 0 && (
                <View style={styles.emptyCartContainer}>
                    <Image source={{ uri: 'https://images.unsplash.com/photo-1619191163420-4a7c0798b8a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wdHklMjBjYXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'}} style={styles.emptyCartImage} resizeMode="cover" />
                    <Text style={styles.emptyCartText}>No items Selected, Please Select First!</Text>
                    <Button onPress={() => props.navigation.navigate('AllRestaurantsScreen')} title="Tap to Select" color='green' />
                </View>
            )}

            <View style={styles.cartItemsContainer}>
                <FlatList showsVerticalScrollIndicator={false} data={cartItems} keyExtractor={(item) => item.itemId} renderItem={CartRenderItem} />
            </View>
            
        </View>
    )
};

export const screenOptions = navData => {
    return {
        headerLeft: () => (
        <View style={{ marginHorizontal: 10 }}>
            <Ionicons name={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } size={25} color= { Platform.OS === 'android' ? 'white' : 'orange' } onPress={() => navData.navigation.toggleDrawer()} />
        </View>
    ),
        headerTitle: 'Your Cart',
        
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    itemWrapper: {
        marginVertical: 8,
        marginHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '40%',
        borderRadius: 6,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.26,
        shadowRadius: 10,
        elevation: 6,
    },
    itemCountContainer: {
        marginVertical: 4,
        marginHorizontal: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '100%',
        textAlign: 'center',
        flexDirection: 'row',
        paddingTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemCountHeading: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
    },
    itemCount: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        marginLeft: 5,
    },
    dividerContainer: {
        marginBottom: 2,
        width: '100%',
        alignItems: 'center',
        paddingBottom: 3,
    },
    divider: {
        marginVertical: 3,
        width: '80%',
        alignSelf: 'center',
        paddingBottom: 3,
    },
    cartItemsContainer: {
        flex: 1,
        marginTop: 15,
        marginHorizontal: 10,
    },

    emptyCartContainer: {
        flex: 1,
        marginVertical: 50,
        alignItems: 'center',
    },
    emptyCartImage: {
        width: 200,
        height: 150,
        borderRadius: 20,
    },
    emptyCartText: {
        fontFamily: 'open-sans-bold',
        marginVertical: 10,
        fontSize: 15,
    },
});

export default CartScreen;