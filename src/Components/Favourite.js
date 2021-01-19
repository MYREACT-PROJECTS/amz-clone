import React from 'react'
import  { useState, useEffect } from 'react';
import { db } from "../firebase";
import { useStateValue } from "../Components/StateProvider";
import CheckoutProduct from '../Components/CheckoutProduct'
import Favcom from '../Components/Favcom'
import '../Components/Favourite.css'

export default function Favourite() {
const [{ basket, user,favourite }, dispatch] = useStateValue();
  const [fav, setFav] = useState([]);
  useEffect(() => {
  
     if (favourite.length !=0 ){ 
    db
    .collection('users')
    .doc(user?.uid)
    .collection('favs')
    .doc(user?.id)
    .set({
     product:favourite,
     created: new Date()

    }) 
    
    dispatch({
        type: "DELETE",
       
    });
}
    if(user) {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('favs')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setFav(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setFav([])
    }

  }, [user])

  
    return (
        <div  >
            <h1>YOUR FAVOURITES</h1>

            <div  >
            {fav?.map(order => (
                     
                    <Favcom order={order} />
                ))}
            </div>
        </div>
    )
}
