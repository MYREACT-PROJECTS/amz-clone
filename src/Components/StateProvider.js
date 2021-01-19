import React ,{createContext,useContext,useReducer} from 'react';
import reducer, { initialState } from "../Components/Reducer";

//perpare the DateLyer
export const StateContext = createContext();

//wrap our app and provide the data layer 

export const StateProvider = ({reducer,initialState, children})=> ( 
  
    <StateContext.Provider value= {useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
 );

//pul the data fromDatalayer

export  const useStateValue = ()=> useContext(StateContext);
