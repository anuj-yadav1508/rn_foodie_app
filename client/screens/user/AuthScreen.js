import React, { useCallback, useEffect, useReducer, useState } from "react";
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from "react-redux";

import Input from "../../components/Input";
import { login, signup } from "../../redux/actions/authActions";

const INPUT_CHANGE_HANDLER = 'INPUT_CHANGE_HANDLER';

const formReducer = (state, action) => {
    switch(action.type) {
        case INPUT_CHANGE_HANDLER: {
            const updatedValues = {
                ...state.inputValues,
                [action.input]: action.value
            };
            const updatedValidities = {
                ...state.inputValidities,
                [action.input]: action.isValid
            };
            let updatedFormIsValid = true;
            for ( const key in updatedValidities ) {
                updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
            };

            return {
                formIsValid: updatedFormIsValid,
                inputValidities: updatedValidities,
                inputValues: updatedValues
            }
        }
        default: {
            return state;
        }
    }
};


const AuthScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorValidity, setErrorValidity] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false
    });
    
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        inputValidities: {
            name: false,
            email: false,
            password: false,
            confirmPassword: false
        },
        formIsValid: false
    });

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({ type: INPUT_CHANGE_HANDLER, value: inputValue, isValid: inputValidity, input: inputIdentifier });
        
        setErrorValidity({...errorValidity, [inputIdentifier]: inputValidity});
        
    }, [dispatchFormState]);

    // login button function both
    const loginHandler = async () => {
        try {
            setIsLoading(true);
            setError(null);
            if(formState.inputValues.password !== formState.inputValues.confirmPassword) {
                setError('Passwords does not matched with confirm password!');
                setIsLoading(false);
                return;
            };
            if(!isSignUp) {
                await dispatch(login(formState.inputValues.email, formState.inputValues.password));
                // setIsLoading(false);
            } else {
                await dispatch(signup(formState.inputValues.name, formState.inputValues.email, formState.inputValues.password));
                // setIsLoading(false);
            }
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
        }
    };

    useEffect(() => {
        if(error) {
            Alert.alert('Oooops!', error, [{ text: 'Okay', style: 'cancel' }])
        }
    }, [error]);

    return (
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            
        <SafeAreaView style={styles.screen}>
            
            
        {/* <View style={styles.screen}> */}
            <View style={styles.topBackImageContainer}>
                <Image source={require('../../assets/images/food_1.png')} resizeMode='cover' style={styles.imageBack} />
            </View>

            <View style={styles.centerWrapper}>
                <View style={styles.switchContainer}>
                    <TouchableWithoutFeedback onPress={() => setIsSignUp(prevSate => !prevSate)}>
                    <View style={isSignUp ? styles.signupTab : styles.loginTab} >
                        <Text>Log In</Text>
                    </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => setIsSignUp(prevSate => !prevSate)}>
                    <View style={!isSignUp ? styles.signupTab : styles.loginTab} onPress={() => setIsSignUp(prevSate => !prevSate)}>
                        <Text>Sign Up</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Welcome</Text>
                </View>

                
                <View style={styles.inputContainer}>
                    { isSignUp ? 
                    (
                        <View style={{ height: '15%', marginBottom: '10%'}}>
                        <View style={styles.inputGroup}>
                        <View style={styles.inputGroupIcon}><MaterialIcons name='person' style={styles.icon} /></View>
                        <View style={styles.inputGroupInput}>
                            <Input style={styles.input} placeholder='Name' required errorText='Please, provide a valid name!' id='name' onInputChangeHandler={inputChangeHandler} />
                        </View>
                        
                        </View>
                        { errorValidity.name === undefined ? 
                        (<View style={{ marginBottom: 9 }}>
                            <Text style={{ fontFamily: 'open-sans', fontSize: 14, color: 'red' }}>Please provide valid name!</Text>
                        </View>) : null
                         } 
                        </View>) : null
                    }

                    <View style={{ height: '15%', marginBottom: '10%'}}>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputGroupIcon}><MaterialCommunityIcons name='email' style={styles.icon} /></View>
                        <View style={styles.inputGroupInput}>
                            <Input style={styles.input} placeholder='Email' id='email' errorText='Please, provide a valid email!' required email onInputChangeHandler={inputChangeHandler} keyboardType='email-address' autoCapitalize='none' />
                        </View>
                          
                    </View>
                    { errorValidity.email === undefined ? 
                        (<View style={{ marginBottom: 9 }} >
                            <Text style={{ fontFamily: 'open-sans', fontSize: 14, color: 'red' }}>Please provide valid email!</Text>
                        </View>) : null
                        } 
                    </View>

                    <View style={{ height: '15%', marginBottom: '10%'}}>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputGroupIcon}><MaterialIcons name='lock' style={styles.icon} /></View>
                        <View style={styles.inputGroupInput}>
                            <Input style={styles.input} placeholder='Password' id='password' errorText='Please, provide a valid password!' required minLength={5} onInputChangeHandler={inputChangeHandler} />
                        </View>
                          
                    </View>
                    { errorValidity.password === undefined ? 
                        (<View style={{ marginBottom: 9 }} >
                            <Text style={{ fontFamily: 'open-sans', fontSize: 14, color: 'red' }}>Please provide valid password!</Text>
                        </View>) : null
                        } 
                    </View>

                    <View style={{ height: '15%', marginBottom: '10%' }}>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputGroupIcon}><MaterialIcons name='lock' style={styles.icon} /></View>
                        <View style={styles.inputGroupInput}>
                            <Input style={styles.input} placeholder='Confirm Password' id='confirmPassword' errorText='Please, provide a valid password!' required minLength={5} onInputChangeHandler={inputChangeHandler} />
                        </View>
                           
                    </View>
                    { errorValidity.confirmPassword === undefined ? 
                        (<View style={{ marginBottom: 9 }} >
                            <Text style={{ fontFamily: 'open-sans', fontSize: 14, color: 'red' }}>Please provide valid password!</Text>
                        </View>) : null
                        }
                    </View>
                </View>
                

                <View style={styles.buttonContainer}>
                    {
                        isLoading ? <ActivityIndicator size='small' color='white' /> : <Text style={styles.buttonText} onPress={loginHandler}>{isSignUp ? 'Sign Up' : 'Log In'}</Text>
                    }
                    
                </View>
            </View>

            <View style={styles.bottomBackImageContainer}>
                <Image source={require('../../assets/images/food_2.png')} resizeMode='cover' style={styles.imageBack} />
            </View>
        {/* </View> */}
        
        
        </SafeAreaView>
        
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#f3f6f4',
        position: 'relative'
    },
    topBackImageContainer: {
        position: 'absolute',
        top: 0,
        left: -25,
    },
    bottomBackImageContainer: {
        position: 'absolute',
        bottom: 0,
        right: -25,
    },
    imageBack: {
        borderRadius: 40,
    },
    centerWrapper: {
        margin: 40,
        backgroundColor: '#f3f6f4',
        width: '70%',
        minHeight: 500,
        zIndex: 100,
        opacity: 0.9,
        borderRadius: 15,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 6
    },
    switchContainer: {
        width: '70%',
        marginVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        borderColor: '#ccc',
        borderWidth: 2,
        borderRadius: 10,
        // paddingVertical: 8,
        // paddingHorizontal: 5
    },
    loginTab: {
        backgroundColor: 'orange',
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    signupTab: {
        backgroundColor: 'white',
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    headingContainer: {
        alignSelf: 'center',
    },
    heading: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: '#444',
    },
    inputContainer: {
        margin: 25,
        // borderColor: 'red',
        // borderWidth: 2,
        flex: 1,
    },
    // input group
    inputGroup: {
        flexDirection: 'row',
        height: '85%',
        // marginBottom: 25,
        marginBottom: 3,
    },
    inputGroupIcon: {
        backgroundColor: 'black',
        // height: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        paddingHorizontal: 10,
    },
    icon: {
        color: 'white',
        alignSelf:'center',
        fontSize: 23,
    },
    inputGroupInput: {
        flex: 1,
        height: '100%',
    },
    input: {
      height: '100%',  
    },
    buttonContainer: {
        width: '40%',
        alignSelf: 'center',
        marginVertical: 25,
        paddingVertical: 6,
        paddingHorizontal: 15,
        alignItems: 'center',
        backgroundColor: 'orange',
        borderRadius: 6,
    },
    buttonText: {
        fontFamily: 'open-sans-bold',
        color: 'white',
        fontSize: 16,

    },
});

export default AuthScreen;