import { AUTHENTICATION, DIDTRYLOGIN, LOGIN, LOGOUT } from "../actions/authActions";

const initialState = {
    user: null,
    didTryLogin: false,
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                ...state,
                user: action.user,
            }
        }

        case DIDTRYLOGIN: {
            return {
                ...state,
                didTryLogin: true,
            }
        }

        case AUTHENTICATION: {
            return { 
                ...state,
                user: action.user,
                didTryLogin: true,
            }
        }

        case LOGOUT: {
            return {
                ...state,
                user: null,
            }
        }

        default: {
            return state;
        }
    }
};

export default AuthReducer;