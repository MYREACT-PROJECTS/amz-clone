import React, {useEffect} from 'react';
//import logo from './logo.svg';
import './App.css';
import './Components/Header.css'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header"
import Login from './Components/Login';
import Checkout from "./Components/Checkout";
import { auth } from './firebase';
import {useStateValue} from './Components/StateProvider';
import Payment from './Components/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Components/Orders';
import Favourite from "./Components/Favourite";

const promise =loadStripe(

  "pk_test_51IVeyRABkjwGvjrElqvzlrGAxmtgcc1CBDpGdQy5MGYPMOJ0KcecHLxNpmtHyTKNfGaa42MntYGDjHPjQS9Ft7VW00xpnmbzFY"
);

  

function App() {
  const [{basket,user,favourite},dispatch] = useStateValue();



  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      console.log('the user is >>',authUser)
      if (authUser){
        dispatch({
          type:'SET_USER',
          user:authUser
        })

      }
      else{
        dispatch({
          type:'SET_USER',
          user:null
        })

      }
    })
    // will only run once when app component load

    
    
  }, [])


  return (
    <div className="app">
      <Router>
        
        <Switch>
        <Route path="/login">
           <Login />
          </Route>
          <Route path= '/Favourite' >
           <Header />
           <Favourite/>
          </Route>

          <Route path="/orders">
            <Header />
           <Orders />
          </Route>
          <Route path="/Payment">
           <Header />
           <Elements stripe={promise}>
           <Payment/>
           </Elements>
          </Route>
          <Route path="/Checkout">
          <Header/>
           <Checkout />
          </Route>
          <Route path="/">
          <Header/>
           <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
  }

export default App;
