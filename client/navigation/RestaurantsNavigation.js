import React from 'react';
import { Image, Platform, SafeAreaView, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

import AllRestaurantsScreen, { screenOptions as AllResScreenOptions } from '../screens/foodie/AllRestaurantsScreen';
import OrdersScreen from '../screens/foodie/OrdersScreen';
import OffersScreen from '../screens/others/OffersScreen';
import AccountDetailScreen from '../screens/user/AccountDetailScreen';
import SingleRestaurantScreen, { screenOptions as SingleRestaurantScreenOptions } from '../screens/foodie/SingleRestaurantScreen';
import FilterdResturantsScreen, { screenOptions as FilteredResturantScreenOptions } from '../screens/foodie/FilteredResturantsScreen';
import CartScreen, { screenOptions as CartScreenOptions } from '../screens/user/CartScreen';
import FavouriteResturantsScreen, { screenOptions as FavouriteScreenOptions } from '../screens/foodie/FavouriteResturantsScreen';
import { logout } from '../redux/actions/authActions';

const defaultStackOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? 'orange' : 'white',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : 'orange',
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
};

const ResStack = createStackNavigator();

const ResStackNavigation = props => {
    return (
        <ResStack.Navigator screenOptions={defaultStackOptions}>

            <ResStack.Screen name='AllRestaurantsScreen' component={AllRestaurantsScreen} options={AllResScreenOptions} />

            <ResStack.Screen name='FilteredResturantsScreen' component={FilterdResturantsScreen} options={FilteredResturantScreenOptions} />

            <ResStack.Screen name='SingleRestaurantScreen' component={SingleRestaurantScreen} options={SingleRestaurantScreenOptions}  />

            <ResStack.Screen name='FavouriteResturantsScreen' component={FavouriteStackNavigation} options={FavouriteScreenOptions} />

            <ResStack.Screen name='CartScreen' component={CartScreen} options={CartScreenOptions}  />

            <ResStack.Screen name='Orders' component={OrdersScreen} />
        </ResStack.Navigator>
    )
};

const OrderStack = createStackNavigator();

const OrderStackNavigation = props => {
    return (
        <OrderStack.Navigator screenOptions={defaultStackOptions} >
            <OrderStack.Screen name='Orders' component={OrdersScreen} />
        </OrderStack.Navigator>
    )
};

const OffersStack = createStackNavigator();

const OffersStackNavigation = props => {
    return (
        <OffersStack.Navigator  >
            <OffersStack.Screen name='Offers' component={OffersScreen} />
        </OffersStack.Navigator>
    )
};

const CartStack = createStackNavigator();

const CartStackNavigation = props => {
    return (
        <CartStack.Navigator screenOptions={defaultStackOptions}>
            <CartStack.Screen name='CartScreen' component={CartScreen} options={CartScreenOptions} />
        </CartStack.Navigator>
    )
};

const FavouriteStack = createStackNavigator();

const FavouriteStackNavigation = props => {
    return (
        <FavouriteStack.Navigator screenOptions={defaultStackOptions} >
            <FavouriteStack.Screen name='Favourite' component={FavouriteResturantsScreen} options={FavouriteScreenOptions} />
        </FavouriteStack.Navigator>
    )
}

const AccountDetailStack = createStackNavigator();

const AccountDetailStackNavigation = props => {
    return (
        <AccountDetailStack.Navigator screenOptions={defaultStackOptions} >
            <AccountDetailStack.Screen name='Account Details' component={AccountDetailScreen} />
        </AccountDetailStack.Navigator>
    )
};

// drawer navigator
const DrawerNavigator = createDrawerNavigator();

const MainDrawerNavigation = props => {
    const dispatch = useDispatch();
    return (
        <DrawerNavigator.Navigator drawerContentOptions={{
            activeTintColor: 'orange',
            inactiveTintColor: '#444'
        }} 
            drawerContent={(props) => {
                return (
                    <View style={{flex: 1}}>
                        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                            <Image source={{ uri: 'https://t3.ftcdn.net/jpg/03/41/33/76/240_F_341337621_4sY6E8BuCZNC7DZIRXS1Vu9PTbeP2wXx.jpg'}} style={{ width: '80%', height: 100, alignSelf: 'center', marginVertical: 10, }} resizeMode='cover' />
                            <DrawerItemList {...props} />
                            <View style={{ alignSelf: 'center', marginVertical: 15,  }}>
                                <Text style={{ fontFamily: 'open-sans-bold'}} onPress={() => dispatch(logout())} >Logout</Text>
                            </View>
                        </SafeAreaView>
                    </View>
                )
            }}
        >
            <DrawerNavigator.Screen name='Home' component={MainTabNavigation} options={{ 
                drawerIcon: () => (
                    <FontAwesome name='home' size={23} color={props.focused ? 'orange' : '#444'} />
                ), 
                drawerLabel: 'Home'
            }} />

            <DrawerNavigator.Screen name='Favourite Resturants' component={FavouriteStackNavigation} options={{ 
                drawerIcon: () => (
                    <Ionicons name="heart-outline" size={23} color={props.focused ? 'orange' : '#444'} />
                ), 
                drawerLabel: 'Favourite Resturants'
            }} />
        </DrawerNavigator.Navigator>
    )
};




const TabNavigator = createBottomTabNavigator();

const MainTabNavigation = props => {
    return (
        <TabNavigator.Navigator tabBarOptions={{ activeTintColor: '#444', inactiveTintColor: '#ccc' }} >
            <TabNavigator.Screen name='Home' component={ResStackNavigation} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <FontAwesome name='home' size={size} color={color} />
                ),
            }} />

            <TabNavigator.Screen name='Offers' component={OffersScreen} options={{ 
                tabBarLabel: 'Offers',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name='empire' size={size} color={color} />
                ),
            }} />

            <TabNavigator.Screen name='Orders' component={OrderStackNavigation} options={{ 
                tabBarLabel: 'Orders',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name='first-order' size={size} color={color} />
                ),
            }} />

            <TabNavigator.Screen name='Cart' component={CartStackNavigation} options={{ 
                tabBarLabel: 'Cart',
                tabBarIcon: ({ color, size }) => (
                    <Feather name='shopping-cart' size={size} color={color} />
                ),
            }} />

            <TabNavigator.Screen name='Account' component={AccountDetailStackNavigation} options={{ 
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name='user-o' size={size} color={color} />
                ),
            }} />
        </TabNavigator.Navigator>
    )
};

export default MainDrawerNavigation;