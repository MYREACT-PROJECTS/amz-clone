import React from 'react'
import '../Components/Checkout.css'
import Subtotal from '../Components/Subtotal'
import {useStateValue} from '../Components/StateProvider';
import CheckoutProduct from '../Components/CheckoutProduct';
import { useHistory } from 'react-router-dom';
import Payment from '../Components/Payment'


export default function Checkout() {
    const history= useHistory();
    const [{basket,user},dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img 
                className="checkout__ad"
                src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                alt=""
                />

            <div >
                <h3>{user?.email}</h3>
            <h2 className="checkout__title">Your shopping Basket</h2>


              {basket.map(item=>(
                  <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  />
              )

              )}

            </div>
            </div>
            <div  className ="checkout__right" onClick={e=> history.push('/Payment')}>
                <Subtotal />

            </div>
            
        </div>
    )
}
