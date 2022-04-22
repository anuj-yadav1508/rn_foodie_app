import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch } from "react-redux";
import { authentication, didTryLogin } from "../../redux/actions/authActions";

const StartupScreen = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryAutoLogin = async () => {
            try {
                const data = await AsyncStorage.getItem('userData');
                const user = JSON.parse(data);

                if(user) {
                    dispatch(authentication(user));
                } else {
                    dispatch(didTryLogin());
                }
            } catch (err) {
                console.log(err)
            }
        };

        tryAutoLogin();
    }, [])
    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color='orange' />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default StartupScreen;