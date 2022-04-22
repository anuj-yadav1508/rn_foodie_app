import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { useSelector } from 'react-redux';

import MenuItem from '../../components/MenuItem';

const SingleRestaurantScreen = props => {
    const RESTAURANTS = useSelector(state => state.resturants.resturants);
    const MENUITEMS = useSelector(state => state.resturants.menuItems);

    const cartItems = useSelector(state => state.cart.items);
    
    
    // render menu item
    const RenderMenuItem = itemData => {
        return (
            <MenuItem itemData={itemData} resturantName={props.route.params.resturantName} />
        )
    };
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const selectedRes = RESTAURANTS.find(res => res._id === props.route.params.resturantId);

    const resDetails = `${selectedRes.categories.join(' · ')} · ${selectedRes.price} · 💵 · ${selectedRes.ratings} · ⭐️ (${selectedRes.ratingsCount}+)`;
    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.upperPart}>
                <Image source={{ uri: selectedRes.imageUrl }} style={{...styles.image, height: height / 3.5 }} resizeMode='cover' />

                <View style={styles.resInfo}>
                    <Text style={styles.resName}>{selectedRes.name}</Text>
                    <Text style={styles.resDetails}>{resDetails}</Text>
                </View>
            </View>

            <Divider width={2} style={{...styles.divider, height: 5, alignItems: 'center' }} />

            <View style={{...styles.menuItemList }}>
                <FlatList data={MENUITEMS} keyExtractor={(item) => item._id} renderItem={RenderMenuItem}  />
            </View>

            {cartItems.length !== 0 && (<View style={styles.cartShowContainer}>
                 <TouchableOpacity onPress={() => props.navigation.navigate('CartScreen', { screen: 'CartScreen' })}>
                <Text style={styles.cartButtonText}>{`View Cart (${cartItems.length} items)`}</Text></TouchableOpacity>
            </View>)}

        </SafeAreaView>
    )
};

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.resturantName
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: '100%',
    },
    resName: {
        paddingVertical: 4,
        paddingHorizontal: 5,
        fontFamily: 'open-sans-bold',
        fontSize: 15,
    },
    resDetails: {
        fontFamily: 'open-sans',
        paddingHorizontal: 5,
        fontSize: 15,
        marginBottom: 10,
    },
    divider: {
        height: 4,
    },
    menuItemList: {
        flex: 1,
    },
    cartShowContainer: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        backgroundColor: '#444',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    cartButtonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 14,
    },
});

export default SingleRestaurantScreen; 