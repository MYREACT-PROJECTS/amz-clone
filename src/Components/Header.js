import React from 'react'
import '../Components/Header.css'
import SearchIcon from "@material-ui/icons/Search";
//import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
//import ShoppingBasketSharpIcon from '@material-ui/icons/ShoppingBasketSharp';
import ShoppingBasketTwoToneIcon from '@material-ui/icons/ShoppingBasketTwoTone';
import {Link} from 'react-router-dom';
import {useStateValue} from '../Components/StateProvider';
import {auth} from '../firebase';



export default function Header() {
  const [{basket,user,favourite},dispatch] = useStateValue();

  const handleAuthentication=()=>{

    if (user){
      auth.signOut();
    
    }


  }

            
    return (
        <div className="header">
          <Link to = "/"> 
            <img
              className="header__logo"
              src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
          </Link>
    
          <div className="header__search">
            <input className="header__searchInput" type="text" />
            <SearchIcon className="header__searchIcon" />
          </div>
    
          <div className="header__nav">
            <Link to = { !user && '/Login'}>
              <div onClick={handleAuthentication}  className="header__option">
                <span className="header__optionLineOne">Hello { user ? user.email :
                "GUEST"

                }</span> 
                <span className="header__optionLineTwo">{
                  user ? ' Sign Out': 'Sign In'
                }</span>
              </div>
              </Link>
                
            <Link to = '/Orders'>
              <div className="header__option">
                <span className="header__optionLineOne">Returns</span>
                <span className="header__optionLineTwo">& Orders</span>
              </div>
              </Link>
            
              <Link to = './Favourite'> 
 
            <div className="header__option">
              <span className="header__optionLineOne"> <h3>{favourite?.length}</h3>
                
               </span>
              <span className="header__optionLineTwo"> Favoutite</span>
                                
            </div>
            </Link>
    
            <Link to = "/checkout">
              <div className="header__optionBasket">
                <ShoppingBasketTwoToneIcon />
                <span className="header__optionLineTwo header__basketCount">
                  {basket?.length}
                </span>
              </div>
              </Link>
            
          </div>
        </div>
      );
    }