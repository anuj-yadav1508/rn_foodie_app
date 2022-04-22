import axios from "axios";

export const TOGGLE_FAV_RES = 'TOGGLE_FAV_RES';
export const GET_SERVER_RESTURANTS = 'GET_SERVER_RESTURANTS';
export const GET_SERVER_MENUITEMS = 'GET_SERVER_MENUITEMS';
export const GET_SERVER_CATEGORIES = 'GET_SERVER_CATEGORIES';
export const GET_SERVER_FAVOURITES = 'GET_SERVER_FAVOURITES';

export const getServerResturants = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        
        try {
            const res = await axios({
                url: 'http://172.20.10.2:8800/api/resturants/allresturants',
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                },
                method: 'GET',
            });

            
            dispatch({ type: GET_SERVER_RESTURANTS, resturants: res.data });
        } catch (err) {
            let message = 'Something went wrong!';
            if(err.message === 'Request failed with status code 404') {
                message = 'Url not found!'
            };
            if(err.message === 'Request failed with status code 401') {
                message = 'Headers are not provided!'
            };
            if(err.message === 'Request failed with status code 402') {
                message = 'Token are not provided!'
            };
            if(err.message === 'Request failed with status code 400') {
                message = 'Token is not valid!'
            };
            if(err.message === 'Request failed with status code 500') {
                message = 'Server error!'
            };

            throw new Error(message);
        }
    };
};

export const getServerMenuitems = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        
        try {
            const res = await axios({
                url: 'http://172.20.10.2:8800/api/resturants/menu/allmenus',
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                },
                method: 'GET',
            });

            dispatch({ type: GET_SERVER_MENUITEMS, menuItems: res.data });
        } catch (err) {
            throw new Error(err);
        }
    };
};

// export const getServerCategories = () => {
//     return async (dispatch, getState) => {
//         const user = getState().auth.user;
        
//         try {
//             const res = await axios({
//                 url: 'http://172.20.10.2:8800/api/resturants/category/allcategories',
//                 headers: {
//                     'authorization': `Bearer ${user.accessToken}`
//                 },
//                 method: 'GET',
//             });

//             dispatch({ type: GET_SERVER_CATEGORIES, categories: res.data });
//         } catch (err) {
//             throw new Error(err);
//         }
//     };
// };


// favouriting a resturant action
export const favouritingResServer = (resturant) => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        try {
            const res = await axios({
                method: 'POST',
                url: `http://172.20.10.2:8800/api/resturants/favouriting/${user._id}`,
                data: {
                    resturantId: resturant._id,
                },
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                }
            });

            dispatch({ type: TOGGLE_FAV_RES, resturant: resturant });
        } catch (err) {
            throw new Error(err);
        }
    };
};

// defavouriting a resturant action
export const defavouritingResServer = (resturant) => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        try {
            const res = await axios({
                method: 'POST',
                url: `http://172.20.10.2:8800/api/resturants/defavouriting/${user._id}`,
                data: {
                    resturantId: resturant._id,
                },
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                }
            });

            dispatch({ type: TOGGLE_FAV_RES, resturant: resturant });
        } catch (err) {
            throw new Error(err);
        }
    };
};

export const getServerFavourites = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        try {
            const res = await axios({
                method: 'GET',
                url: `http://172.20.10.2:8800/api/resturants/allfavouriteresturants/${user._id}`,
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                }
            });

            
            dispatch({ type: GET_SERVER_FAVOURITES, favData: res.data.favouriteResturants });
        } catch (err) {
            throw new Error(err);
        }
    };
};

export const toggleFavRes = (resturant) => {
    return { type: TOGGLE_FAV_RES, resturant: resturant };
};