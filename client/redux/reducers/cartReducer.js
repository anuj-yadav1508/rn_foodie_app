import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartActions';

const initialState = {
    items: [],
};

const CartReducer = (state=initialState, action) => {
    
    switch(action.type) {
        // adding to cart case
        case ADD_TO_CART: {
            const foundItem = state.items.find(item => item.resturantName !== action.resturnatName);

            if(foundItem) {
                const updatedSelectedItems = [...foundItem.selectedItems, action.menuItem];
                const itemIndex = state.items.findIndex(item => item.resturantName === action.resturantName);

                const newUpdatedItem = {
                    itemId: foundItem.itemId,
                    resturantName: foundItem.resturantName,
                    selectedItems: updatedSelectedItems,
                };

                const updatedItems = [...state.items];
                updatedItems[itemIndex] = newUpdatedItem;

                return {
                    ...state,
                    items: updatedItems,
                }
            } else {  
                const newItem = {
                    itemId: new Date().toString(),
                    resturantName: action.resturantName,
                    selectedItems: [action.menuItem],
                }

                const updatedItems = [...state.items];
                return {
                    ...state,
                    items: updatedItems.concat(newItem),
                }
            }
        }

        // removing from cart case
        case REMOVE_FROM_CART: {
            const foundItem = state.items.find(item => item.resturantName !== action.resturnatName);
            
            if(foundItem.selectedItems.length === 1) {
                const updatedItems = state.items.filter(item => item.resturantName !== action.resturantName);

                return {
                    ...state,
                    items: updatedItems,
                }
            } else {
                const updatedSelectedItems = foundItem.selectedItems.filter(item => item.menuId !== action.menuItem.menuId);
                
                const itemIndex = state.items.findIndex(item => item.resturantName === action.resturantName);

                const newUpdatedItem = {
                    itemId: foundItem.itemId,
                    resturantName: foundItem.resturantName,
                    selectedItems: updatedSelectedItems,
                };

                const updatedItems = [...state.items];
                updatedItems[itemIndex] = newUpdatedItem;

                return {
                    ...state,
                    items: updatedItems,
                }
            }
        }

        default: {
            return state;
        }
    }
};

export default CartReducer;