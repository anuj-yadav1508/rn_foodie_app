import React from "react";
import { View, StyleSheet, Text, Image, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import { useSelector ,useDispatch } from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { defavouritingResServer, favouritingResServer } from "../redux/actions/resturantsActions";

const ResturantItem = props => {
    const dispatch = useDispatch();
    const favResturants = useSelector(state => state.resturants.favouriteResturants);
    let favourited = !!favResturants?.find(item => item._id === props.itemData.item._id);
    const TouchableComp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
    return (
        <TouchableComp onPress={() => props.navigation.navigate('SingleRestaurantScreen', {
            resturantName: props.itemData.item.name,
            resturantId: props.itemData.item._id
        })}>
        <View style={styles.resItem}>
            <View style={styles.upperResItem}>
                <Image source={{ uri: props.itemData.item.imageUrl }} style={styles.image} resizeMode="cover" />
                <View style={styles.iconContainer}>
                    { favourited ? (<FontAwesome name="heart" size={23} style={styles.heartIcon} onPress={() => dispatch(defavouritingResServer(props.itemData.item))} />) : (<Ionicons name="heart-outline" size={23} style={styles.heartIcon} onPress={() => dispatch(favouritingResServer(props.itemData.item))} />)}
                </View>

                { props.offer && (
                    <View style={styles.offerContainer}>
                        <Text style={styles.offerText}>{props.itemData.item.offer}% Discount</Text>
                    </View>
                )}
            </View>

            <View style={styles.bottomResItem}>
                <Text style={styles.resName}>{props.itemData.item.name}</Text>
                <View style={styles.resInfo}>
                    <View style={styles.resTimeContainer}>
                    
                    <Text style={styles.resTime}>{props.itemData.item.timeToCook} min</Text>
                    
                    </View>

                    <View style={styles.resRatings}>
                        <Text style={styles.rating}>{props.itemData.item.ratings}</Text>
                    </View>
                </View>
            </View>
        </View>
        </TouchableComp>
    )
};

const styles = StyleSheet.create({
    resItem: {
        backgroundColor: 'white',
        marginBottom: 18,
    },
    upperResItem: {
        alignItems: 'center',
    },
    image: {
        width: '96%',
        height: 150,
        position: 'relative',
    },
    iconContainer: {
        position: 'absolute',
        top: '5%',
        right: '8%',
        zIndex: 999,
    },
    heartIcon: {
        color: '#ccc',
    },
    bottomResItem: {
        marginVertical: 5,
        marginHorizontal: 8,
    },
    resName: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
    },
    resInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    resTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    resTime: {
        alignSelf: 'center',
        color: '#444',
        fontFamily: 'open-sans',
    },
    resRatings: {
        backgroundColor: '#E2E0E0',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 45,
    },
    rating: {
        fontFamily: 'open-sans',
        fontSize: 12,
    },
    // offers discont section
    offerContainer: {
        backgroundColor: 'red',
        position: 'absolute',
        bottom: '5%',
        right: '10%',
        borderRadius: 6,
    },
    offerText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 4,
        textAlign: 'center',
    },
});

export default ResturantItem;