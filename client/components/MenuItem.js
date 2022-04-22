import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Divider } from "react-native-elements";
import { useSelector ,useDispatch } from "react-redux";

import { addToCart, removeFromCart } from '../redux/actions/cartActions';

const MenuItem = props => {
    let selectedMenuItem;
    const dispatch = useDispatch();
    const width = Dimensions.get('window').width;

    const cartItems = useSelector(state => state.cart.items);
    const selectedCartItem = cartItems.find(item => item.resturantName === props.resturantName);
    if(selectedCartItem) {
        selectedMenuItem = !!selectedCartItem.selectedItems.find(item => item.menuId === props.itemData.item.menuId);
    }
    
    const [checkboxState, setCheckboxState] = useState(selectedMenuItem || false);

    return (
        <>
        <View style={{ ...styles.menuItem, width: width }}>
            <View style={styles.checkboxContainer}>
            <BouncyCheckbox size={23} iconStyle={{
                borderRadius: 0,
                borderColor: 'green',
                borderWidth: 2,
            }} isChecked= {checkboxState}
                
                onPress={() => {
                    setCheckboxState(!checkboxState);
                    if(checkboxState === false) {
                        dispatch(addToCart(props.resturantName, props.itemData.item));
                    }
                    if(checkboxState === true) {
                        dispatch(removeFromCart(props.resturantName, props.itemData.item));
                    }
                }} fillColor="green" />
            </View>

            <View style={styles.menuInfo}>
                <Text style={styles.menuName}>{props.itemData.item.name}</Text>
                <Text style={styles.description}>{props.itemData.item.description}</Text>
                <Text style={styles.price}>$ {props.itemData.item.price}</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: props.itemData.item.imageUrl }} style={styles.image} resizeMode="cover" />
            </View>
           
        </View>

            <Divider width={2} style={{ marginBottom: 12 }} />
        </>
    )

};

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        maxWidth: '96%',
        marginTop: 16,
        marginBottom: 4,
        flex: 1,
    },
    checkboxContainer: {
        width: '10%',
    },
    menuInfo: {
        width: '65%',
    },
    imageContainer: {
        width: '25%',
    },
    image: {
        height: 80,
        width: '100%',
    },
    menuName: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
    },
    price: {
        fontFamily: 'open-sans-bold',
    },
});

export default MenuItem;