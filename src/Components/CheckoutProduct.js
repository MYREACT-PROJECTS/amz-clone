import React from 'react'
import '../Components/CheckoutProduct.css';
import {useStateValue} from '../Components/StateProvider';


export default function CheckoutProduct({id,image,title,price,rating,hideButton}) {
    const [{basket},dispatch] = useStateValue();

    //remove ITMES FROMBASKET
    const removeFromBasket =()=>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id : id
           
        })

    }
    return (
        <div className= "checkoutProduct">
            <img className="checkoutProduct__image" src={image}
            />
            <div className="checkoutProduct__info">
                <p className="checkout__title">{title}</p>
                <p className="checkoutProduct__price">
                    <samall>$</samall>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                {Array(rating)
                    .fill()
                    .map((_,i)=>(
                        <p>🌟</p>
                    ))}

                </div>
                { !hideButton && ( 
                <button onClick={removeFromBasket}>REMOVE FROM BASKET</button>
                )}

            </div>
        </div>
    )
}
