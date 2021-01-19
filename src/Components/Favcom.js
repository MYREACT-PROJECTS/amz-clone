import React from 'react'
//import './Order.css'
import moment from "moment";
import CheckoutProduct from "../Components/CheckoutProduct";
import CurrencyFormat from "react-currency-format";
import  '../Components/Favcom.css'
import Product from  '../Components/Product'

function Favcom({ order }) {
    console.log(order)
    return (
        <div className='home1' >
             <h2>MY FAVO</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="">
                <small>{order.id}</small>
            </p>
            {order.data.product?.map(item => (
                <Product
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                />
                ))}

        </div>
         
             )
}

export default Favcom;