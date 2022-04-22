import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import MainDrawerNavigation from './RestaurantsNavigation';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/others/StartupScreen';

const AppNavigator = props => {
    const user = useSelector(state => state.auth.user);
    const didLogin = useSelector(state => state.auth.didTryLogin);
    console.log(didLogin);
    
    return (
        <NavigationContainer>
            { (!user && !didLogin ) && <StartupScreen />}
            { (!user && didLogin ) && <AuthScreen /> }
            { user && <MainDrawerNavigation />}
        </NavigationContainer>
    )
};

export default AppNavigator;