import React, { useEffect, useReducer } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const INPUT_UPDATE = 'INPUT_UPDATE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch(action.type){
        case INPUT_UPDATE: {
            return {
                ...state,
                inputValue: action.value,
                inputIsValid: action.isValid
            }
        }
        case INPUT_BLUR: {
            return {
                ...state,
                touched: true,
            }
        }
        default: {
            return state;
        }
    }
};



const Input = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        inputValue: props.initialValue ? props.initialValue : '',
        inputIsValid: props.initialValidity,
        touched: false
    });

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR})
    };

    const { onInputChangeHandler, id } = props;

    useEffect(() => {
    if( inputState.touched ) {
        onInputChangeHandler(id, inputState.inputValue, inputState.inputIsValid)
    }
    }, [inputState, onInputChangeHandler]);

    

    const InputChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }

        dispatch({type: INPUT_UPDATE, value: text, isValid: isValid})
    };

    return (
        <View>
        <View  >
             {/* <Text style={styles.formLabel}>{props.label}</Text> */}
            
             <TextInput {...props} style={styles.formTextInput} value={inputState.inputValue} onChangeText={(text) => InputChangeHandler(text)} onBlur={lostFocusHandler}  />

             
             
        </View>
        {/* <View>
            {!inputState.inputIsValid && inputState.touched && <View style={styles.errorContainer}><Text style={styles.errorText}>{props.errorText}</Text></View>}
        </View> */}
        </View>
    )
};

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        
    },
    formLabel: {
        fontFamily: 'open-sans-bold',
        fontSize: 16,
        marginBottom: 10,
        color: 'white'
    },
    formTextInput: {
        fontFamily: 'open-sans',
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 2,
        paddingHorizontal: 4,
        paddingVertical: 8,
        backgroundColor: 'white',
        // borderRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.26,
        shadowRadius: 6,
        elevation: 6,
        fontSize: 16,
        // height: '100%',
        maxHeight: '100%',
        zIndex: 100,
    },
    errorContainer: {
        marginTop: 5,
        marginBottom: 5,
    },
    errorText: {
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 14
    }
});

export default Input;