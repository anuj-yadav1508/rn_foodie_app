import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';

import { RESTAURANTS } from '../../data/dummy-data';
import ResturantItem from "../../components/ResturantItem";


const FilterdResturantsScreen = props => {
    const width = Dimensions.get('window').width;
    const catName = props.route.params.catName;
    let filteredResturants;

    filteredResturants = catName === 'pick-up' ? RESTAURANTS.filter(res => !res.deliveryStatus.includes('pick-up')) : RESTAURANTS.filter(res => !res.categories.includes(catName));

    const filterResRenderItem = itemData => {
        return (
            <ResturantItem itemData={itemData} navigation={props.navigation} />
        )
    };
    
    return (
        <View style={styles.screen} >
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>{`${props.route.params.catName} providing Resturants`}</Text>
                <Divider width={2} color="#444" style={{ marginVertical: 4 }} />
            </View>

            <View style={styles.resList}>
                <FlatList data={filteredResturants} keyExtractor={(item) => item.id} renderItem={filterResRenderItem} />
            </View>
        </View>
    )
};

export const screenOptions = navData => {
    return {
        headerTitle: `${navData.route.params.catName} Filtered Resturants`,
        headerBackTitleVisible: false,
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    headingContainer: {
        alignSelf: 'center',
        // backgroundColor: 'darkgreen',
        marginVertical: 7,
        marginHorizontal: 15,
        paddingVertical: 4,
        paddingHorizontal: 9,
    },
    heading: {
        color: 'green',
        fontFamily: 'open-sans-bold',
        fontSize: 16,
    },
    resList: {
        flex: 1,
    },
});

export default FilterdResturantsScreen;