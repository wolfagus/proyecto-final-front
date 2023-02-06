import React, { useContext } from 'react';

export const initialState = {
  userLogged: false,
  userData: {},
  isLoading: false, 
  carrito: []
  };

export const ActionTypes = {
  SET_USER_LOGIN: 'SET_USER_LOGIN',
  SET_USER_DATA: 'SET_USER_DATA',
  SET_ADD_CARRITO: 'SET_ADD_CARRITO',
  SET_REMOVE_CARRITO: 'SET_REMOVE_CARRITO',
  SET_REMOVE_ALL_CARRITO: 'SET_REMOVE_ALL_CARRITO',
};

export const reducer = (state, action) => {
  const {type, value} = action;
  switch (type) {
    case ActionTypes.SET_USER_LOGIN: {
      return {
        ...state,
        userLogged: value,
      };
    }
    case ActionTypes.SET_USER_DATA: {
      return {
        ...state,
        userData: value,
      };
    }
    case ActionTypes.SET_ADD_CARRITO: {
      return {
        ...state,
        carrito: [...state.carrito, value],
      };
    }
    case ActionTypes.SET_REMOVE_CARRITO: {
      return {
        ...state,
        carrito: value,
      };
    }
    case ActionTypes.SET_REMOVE_ALL_CARRITO: {
      return {
        ...state,
        carrito: value,
      };
    }
    default:
      return state;
  }
};

export const initialContext = {
  contextState: initialState,
  setContextState: () => {},
};

const Cont = React.createContext(initialContext);

export function ContextProvider({ children, initial = initialState }) {
  const [state, dispatch] = React.useReducer(reducer, initial);

  const contextState = state;
  const setContextState = dispatch;

  return (
  <Cont.Provider value={{ contextState, setContextState }}>
    {children}
  </Cont.Provider>
  )
};

export const useContextState = () => useContext(Cont);