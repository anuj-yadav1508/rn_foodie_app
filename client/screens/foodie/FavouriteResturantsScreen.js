import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import ResturantItem from '../../components/ResturantItem';
import { getServerFavourites } from '../../redux/actions/resturantsActions';

const FavouriteResturantsScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const favResturants = useSelector(state => state.resturants.favouriteResturants);

    const FavRenderItem = itemData => {
        return (
            <ResturantItem itemData={itemData} navigation={props.navigation} />
        )
    };

    // useEffect for getting server favourite resturants
    useEffect(() => {
        const getServerFavouritesRes = async () => {
            setIsLoading(true);
            try {
                await dispatch(getServerFavourites());
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        };

        getServerFavouritesRes();
    }, []);
    
    return (
        <View style={styles.screen}>

            { isLoading && (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size='large' color='orange' />
                </View>
            )}

            { (!isLoading && favResturants.length === 0) && (
                <View style={styles.noFavResContainer}>
                    <Text style={styles.noFavResText}>No Resturant is Favourited by You!</Text>
                    <Button onPress={() => props.navigation.navigate('AllRestaurantsScreen')} title='Tap to Add Resturants' color='green' />
                </View>
            )}

            { ( !isLoading && favResturants.length !== 0) && 
             (<View style={styles.resList}>
                <FlatList data={favResturants} keyExtractor={(item) => item._id} renderItem={FavRenderItem} />
            </View>)}

            
        </View>
    )
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Favourite Resturants',
        headerLeft: () => (
            <View style={{ marginHorizontal: 10 }}>
                <Ionicons name='menu' size={23} color='orange' onPress={() => navData.navigation.toggleDrawer()} />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    resList: {
        marginTop: 10,
        flex: 1,
    },
    noFavResContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noFavResText: {
        fontFamily: 'open-sans-bold',
        fontSize: 15,
    },
});

export default FavouriteResturantsScreen;