import React, { createContext, useContext, useReducer , useEffect } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];

    case 'REMOVE':
        let newArr = [...state];
        newArr.splice(action.index,1);
        return newArr;

    case 'UPDATE':
      return state.map((food) => {
        if (food.id === action.id) {
          return {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return food;
      });

    case 'DROP' :
      let empArray = [];
      return empArray;

    default:
      console.log('Error in Reducer');
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], () => {
    // Retrieve cart data from localStorage on initialization
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save the cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
