import React, {useState,useEffect} from 'react'
import {useStateValue} from '../Components/StateProvider';
import CheckoutProduct from '../Components/CheckoutProduct';
import {Link,useHistory} from 'react-router-dom';
import '../Components/Payment.css'
import { CardElement,useElements, useStripe } from '@stripe/react-stripe-js';
import { getBasketTotal } from "../Components/Reducer";
import CurrencyFormat from "react-currency-format";
import { db } from '../firebase';
import axios from './axios'






export default function Payment() {
    
    const [{basket,user,favourite},dispatch] = useStateValue();
    const[succeded,setSucceded]= useState(false);
    const [processing,setProcessing]= useState("");
    const stripe = useStripe();
    const elements = useElements();
    const [error,setError] = useState(null);
    const [disabled,setDisabled] = useState(true);
    const [clientSecret,setClientSecret] = useState();
    const history = useHistory();


    useEffect(() => {
      // generate the special stripe secret which allows us to charge a customer
      const getClientSecret = async () => {
          const response = await axios({
              method: 'post',
              // Stripe expects the total in a currencies subunits
              url: `/payments/create?total=${getBasketTotal(basket) * 100}`
          });
          setClientSecret(response.data.clientSecret)
      }

      getClientSecret();
  }, [basket])

  console.log('THE SECRET IS >>>', clientSecret)
  console.log('👱', user)
  
   const  handleSubmit = async (e)=>{
       e.preventDefault();
       setProcessing(true);
     // history.replace("/orders");
       
      

    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
    })
       
    
      .then(({ paymentIntent }) => {
          console.log(paymentIntent.id)
            console.log(paymentIntent.amount)
                        console.log(paymentIntent.created)

           //paymentIntent = payment confirmation 
         db
           .collection('users')
           .doc(user?.uid)
           .collection('orders')
           .doc(paymentIntent.id)
           .set({
             basket:basket,
             amount:paymentIntent.amount,
             created: paymentIntent.created,
           }) 

           setSucceded(true);
           setError(null);
           setProcessing(false);
          

           dispatch({
               type:"EMPTY_BASKET"
           })

           history.replace('/orders')
          
   
          
         });
     };
   
   const handleChange = event=>{
       // listen for changes in CardElement
       //display any errors as the customer types their card details
       setDisabled(event.empty);
    setError(event.error ? event.error.message : "");



   }

    return (
        <div className ='mainpage'>
            <div className="payment__container">
                <h1>
                    Checkout( 
                    <Link to ='/checkout'>{basket?.length} itmes </Link>)
                    </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>

                    </div>

                    <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>REACT LANE</p>
                    <p>LOS ANFELOS, CA</p>

                    </div>


                </div>




                <div className="payment__section">
                    <div className='payment__title'>
                        <h3> Review Items and Delivery</h3>
                    </div>
                    <div className="payment__itmes">
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




                <div className="payment__section">
                <div className='payment__title'>
                    <h3> PAYMENT METHODS</h3>
                    </div>
                    <div className="payment__details">
                    <form className="payment__form" onSubmit={handleSubmit} action="">
                            <CardElement onChange={handleChange} />
                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => <h3>Order Total: {value}</h3>}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                                <button
                  className="payment__button"
                  disabled={processing || disabled || succeded}
                >
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>

                            </div>
                            {/* errors*/}
                            {error && <div>{error}</div>}
                        </form>


                    </div>


                </div>


            </div>
            
        </div>
    )
}

