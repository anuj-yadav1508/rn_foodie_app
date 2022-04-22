import { RESTAURANTS, MENUITEMS, CATEGORIES } from '../../data/dummy-data';
import { GET_SERVER_CATEGORIES, GET_SERVER_FAVOURITES, GET_SERVER_MENUITEMS, GET_SERVER_RESTURANTS, TOGGLE_FAV_RES } from '../actions/resturantsActions';

const initialState = {
    resturants: [],
    menuItems: [],
    categories: CATEGORIES,
    favouriteResturants: [],
};

const ResturantsReducer = ( state = initialState, action ) => {
    switch(action.type) {
        case GET_SERVER_RESTURANTS: {
            return {
                ...state, 
                resturants: action.resturants,
            }
        }

        case GET_SERVER_MENUITEMS: {
            return {
                ...state,
                menuItems: action.menuItems,
            }
        }

        // case GET_SERVER_CATEGORIES: {
        //     return {
        //         ...state,
        //         categories: action.categories,
        //     }
        // }

        case GET_SERVER_FAVOURITES: {
            const favResturants = action.favData;

            let givenFav = [];
            givenFav = favResturants.map(id => {
                return (
                    state.resturants.find(item => item?._id === id)
                )
            });

            
            return {
                ...state,
                favouriteResturants: [...givenFav],
            }
        }

        case TOGGLE_FAV_RES: {
            const foundRes = state.favouriteResturants.find(item => item.id === action.resturant.id);

            if(foundRes) {
                let updatedRes = [...state.favouriteResturants];
                updatedRes = updatedRes.filter(item => item.id !== action.resturant.id);

                return {
                    ...state,
                    favouriteResturants: updatedRes,
                }
            } else {
                return {
                    ...state,
                    favouriteResturants: state.favouriteResturants.concat(action.resturant),
                }
            }
        }

        default: {
            return state;
        }
    }
};

export default ResturantsReducer;