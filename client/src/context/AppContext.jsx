import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  user: null,
  cart: [],
  wishlist: [],
  orders: [],
  isAuthenticated: false
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: !!action.payload 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null,
        isAuthenticated: false 
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.itemId 
            ? { ...item, quantity: action.payload.newQuantity }
            : item
        )
      };
    case 'REMOVE_FROM_CART':
      return { 
        ...state, 
        cart: state.cart.filter(item => item.id !== action.payload) 
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'ADD_TO_WISHLIST':
      const existingWishlistItem = state.wishlist.find(item => item.productId === action.payload.productId);
      if (existingWishlistItem) {
        return state;
      }
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return { 
        ...state, 
        wishlist: state.wishlist.filter(item => item.id !== action.payload) 
      };
    case 'REMOVE_FROM_WISHLIST_BY_PRODUCT_ID':
      return { 
        ...state, 
        wishlist: state.wishlist.filter(item => item.productId !== action.payload) 
      };
    case 'TOGGLE_WISHLIST':
      const existingWishItem = state.wishlist.find(item => item.productId === action.payload.productId);
      if (existingWishItem) {
        return {
          ...state,
          wishlist: state.wishlist.filter(item => item.productId !== action.payload.productId)
        };
      } else {
        return { ...state, wishlist: [...state.wishlist, action.payload] };
      }
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedState = localStorage.getItem('appState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      if (parsedState.user) {
        dispatch({ type: 'SET_USER', payload: parsedState.user });
      }
      if (parsedState.cart) {
        parsedState.cart.forEach(item => {
          dispatch({ type: 'ADD_TO_CART', payload: item });
        });
      }
      if (parsedState.wishlist) {
        parsedState.wishlist.forEach(item => {
          dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify({
      user: state.user,
      cart: state.cart,
      wishlist: state.wishlist
    }));
  }, [state.user, state.cart, state.wishlist]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};