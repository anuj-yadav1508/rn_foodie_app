import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, SafeAreaView, Image, TextInput, TouchableNativeFeedback, TouchableOpacity, Keyboard, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import ResturantItem from '../../components/ResturantItem';
import { getServerCategories, getServerMenuitems, getServerResturants } from '../../redux/actions/resturantsActions';


const AllRestaurantsScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const RESTAURANTS = useSelector(state => state.resturants.resturants);
    const CATEGORIES = useSelector(state => state.resturants.categories);

    useEffect(() => {
        const getStartingData = async () => {
            setIsLoading(true);
            try {
                await dispatch(getServerResturants());
                await dispatch(getServerMenuitems());
                setIsLoading(false);
                // await dispatch(getServerCategories());
            } catch (err) {
                console.log(err.message);
                setIsLoading(false);
            }
        };

        getStartingData();
    }, [])
    
    const TouchableComp = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    // render res item
    const RenderResItem = itemData => (
        <ResturantItem itemData={itemData} navigation={props.navigation} />
    );
    
    return (
        // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.screen}>
            
            <View style={styles.upperContainer} >
            <View style={styles.deliveryContainer}>
                <Text style={styles.deliveryHeading}>Delivering to:</Text>
                <Text style={styles.deliveryAddress}>Home Address</Text>
            </View>

            <View style={styles.searchContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesome style={{...styles.icons, ...styles.searchIcon}} name='search' size={23} />
                </View>

                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder='Search'  />
                </View>

                <View style={styles.iconContainer}>
                    <MaterialIcons style={{...styles.icons, ...styles.segmentIcon}} name='segment' size={26} />
                </View>
            </View>
            </View>

            <View style={styles.categoriesContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories} >
                    {
                        CATEGORIES.map(item => {
                            return (
                                <TouchableComp key={item.catId} onPress={() => props.navigation.navigate('FilteredResturantsScreen', {
                                    catName: item.name
                                })} >
                                    <View  style={styles.categoryItem}>
                                        <Image source={item.imageUrl} style={styles.catImage} resizeMode='cover' />
                                        <Text>{item.name}</Text>
                                    </View>
                                </TouchableComp>
                            )
                        })
                    }
                </ScrollView>
            </View>

            { isLoading ? (
                <View style={styles.resContainer}>
                    <ActivityIndicator size='large' color='orange' />
                </View>
            ) : (<View style={styles.resContainer}>
                <FlatList showsVerticalScrollIndicator={false} data={RESTAURANTS} keyExtractor={(item) => item._id} renderItem={RenderResItem} />
            </View>)}

            

        </View>
        // {/* </TouchableWithoutFeedback> */}
    )
};

export const screenOptions = navData => {
    return {
    headerLeft: () => (
        <View style={{ marginHorizontal: 10 }}>
            <Ionicons name={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' } size={25} color= { Platform.OS === 'android' ? 'white' : 'orange' } onPress={() => navData.navigation.toggleDrawer()} />  
        </View>
    ),
    headerTitle: 'Restaurants',
    headerRight: () => (
        <View style={{ width: 35, height: 35, borderRadius: 17, overflow: 'hidden', marginHorizontal: 15 }}>
            <Image source={require('../../assets/images/anuj_profile.png')} resizeMode='cover' style={{ width: '100%', height: '100%', }} /> 
        </View>
    ),
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: '#FDFDFD',
    },
    upperContainer: {
        backgroundColor: 'white',
        marginTop: 2,
    },
    deliveryContainer: {
        margin: 5,
    },
    deliveryHeading: {
        fontFamily: 'open-sans',
        color: '#444',
        fontSize: 14
    },
    deliveryAddress: {
        fontFamily: 'open-sans-bold',
        color: 'black',
        fontSize: 16,
        marginLeft: 10,
    },
    searchContainer: {
        backgroundColor: '#E2E0E0',
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 6,
    },
    textInputContainer: {
        flex: 1,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: 'open-sans-bold',
    },
    icons: {
        paddingHorizontal: 5,
        color: '#444',
    },
    categoriesContainer: {
        paddingVertical: 5,
        paddingHorizontal: 5, 
        marginVertical: 5,
        backgroundColor: 'white',
    },
    categories: {   
    },
    catImage: {
        width: 50,
        height: 50,
    },
    categoryItem: {
        marginRight: 30,
        alignItems: 'center'
    }, 
    resContainer: {
        flex: 1,
        marginVertical: 5,
    },
});

export default AllRestaurantsScreen; 