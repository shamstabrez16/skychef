import { useReducer } from 'react';

import CartContext from './Cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartReducer = (state, action) => {

  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
    console.log(existingItemIndex);
    
    let updatedItems;
    if(existingItemIndex>=0){
      const existingCartItem = state.items[existingItemIndex];
      console.log(existingCartItem);
     const updatedItem={...existingCartItem, amount: existingCartItem.amount + action.item.amount};
     console.log(updatedItem);
      updatedItems=[...state.items];
      updatedItems[existingItemIndex]=updatedItem;
    
    }
    else{
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  
  if (action.type === 'REMOVE'){
    
    const existingItemIndex = state.items.findIndex(item => item.id === action.id);
    console.log(existingItemIndex);
    const existingCartItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount -  existingCartItem.price;
    let updatedItems;
    console.log("existingCartItem.amount"+existingCartItem.amount);
    if(existingCartItem.amount ===1){
      updatedItems= state.items.filter(item=> item.id !== action.id);

    }
    else{
      const updatedItem={...existingCartItem, amount: existingCartItem.amount - 1};
      updatedItems=[...state.items];
      updatedItems[existingItemIndex]=updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  if( action.type === 'CLEAR'){
    return defaultCartState
  }
  return defaultCartState;


};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id});
  };
  const clearItemsFromCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart : clearItemsFromCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;