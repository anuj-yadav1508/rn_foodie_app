import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Image, Dimensions, FlatList } from 'react-native';

import ResturantItem from "../../components/ResturantItem";
import { RESTAURANTS } from "../../data/dummy-data";

const OffersScreen = props => {

    const offerResturants = RESTAURANTS.filter(res => res.offer);


    // offer render item
    const OfferRenderItem = itemData => {
        return (
            <ResturantItem itemData={itemData} offer navigation={props.navigation} />
        ) 
    };
    
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/images/images/bg3.jpg')} style={{...styles.image, width: Dimensions.get('window').width}} resizeMode="cover" />
                <View style={styles.offersTextContainer}>
                    <Text style={styles.offerText}>LATEST</Text>
                    <Text style={styles.offerText}>AND</Text>
                    <Text style={styles.offerText}>BEST OFFERS</Text>
                </View>
            </View>

            <View style={styles.resList}>
                <FlatList data={offerResturants} keyExtractor={(item) => item.id} renderItem={OfferRenderItem} />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    imageContainer: {
        alignItems: 'center',
        position: 'relative',
    },
    image: {
        height: 225,
    }, 
    offersTextContainer: {
        position: 'absolute',
        top: '40%',
        textAlign: 'center',
    },
    offerText: {
        fontFamily: 'open-sans-bold',
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
    resList: {
        flex: 1,
        marginTop: 15,
    },
});

export default OffersScreen;