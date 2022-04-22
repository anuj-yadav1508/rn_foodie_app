import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import * as Fonts from 'expo-font';
import AppLoading from "expo-app-loading";

import AuthScreen from './screens/user/AuthScreen';
import AppNavigator from './navigation/NavigationContainer';
import ResturantsReducer from './redux/reducers/resturantReducer';
import CartReducer from './redux/reducers/cartReducer';
import AuthReducer from './redux/reducers/authReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    resturants: ResturantsReducer,
    cart: CartReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
        return (
        Fonts.loadAsync({
            'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
        })
        );
    };


export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

    if(!isLoaded) {
        return <AppLoading startAsync={fetchFonts} onError={(err) => console.log(err.message)} onFinish={() => setIsLoaded(true)} />
    };

    return <Provider store={store} ><AppNavigator /></Provider>
};