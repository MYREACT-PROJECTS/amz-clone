import React,{useState}  from 'react'
import '../Components/Product.css'
import {useStateValue} from '../Components/StateProvider';
import { db,auth } from '../firebase';



export default function Product({ id, title, image, price, rating,saved }) {
    const [processing,setProcessing]= useState(true);
    const [{basket,favourite,user},dispatch] = useStateValue();
     console.log('this is the baske>>>>', basket)
     console.log('this is the favourite >>>>', favourite)
     let y= true; 

    const addToBasket = ()=>{

     // dispatch the item into data layer
     
     dispatch({
        
        type: "ADD_TO_BASKET",
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating
     },
    });

    };

    ///////////////add to favourite
    const addToFavourite = ()=>{
        // dispatch the item into data layer
       
        dispatch({
           type: "ADD_TO_FAVOURITE",
           item: {
             id: id,
             title: title,
             image: image,
             price: price,
             rating: rating
        },
       });
      setProcessing(false)
       
        
        
       };
       

    

    return (
        <div className = "product">
            <div className= "product__info">
                <p>{title}</p>
                <p className= "product__price">
                <small>$</small>
                <strong>{price}</strong>
                </p>
                <div className= "product__rating">
                    {Array(rating)
                    .fill()
                    .map((_,i)=>(
                        <p>🌟</p>
                    ))}
                </div>
                
                </div>
                <img src={image} alt="" />
                <div className="Product__button">
                <button onClick={addToBasket}>Add to Basket</button>
                {processing?  <button onClick={addToFavourite} >Add to Favourite </button> :
                <button  > Remove from Favourite </button>
                }
                
                 

                
                 
                 </div>
            
        </div>

);

}
 


