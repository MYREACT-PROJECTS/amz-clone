export const  initialState = {
    basket:[],
    favourite:[],
    user:null


};

//selector
export const getBasketTotal = (basket)=>{
    
    return basket.reduce((amount, item) =>  item.price + amount, 0); 
}
 
    

const reducer = (state,action)=>{
    console.log(action);
    switch(action.type){
        case "ADD_TO_BASKET" :

            return{
                ...state,
                basket:[...state.basket,action.item]
            };
            case "ADD_TO_FAVOURITE" :

            return{
                ...state,
                favourite:[...state.favourite,action.item]
              };

            case "DELETE" :

            return{ 
                ...state,
                favourite: [],

            };


            case "REMOVE_FROM_BASKET":
                const index= state.basket.findIndex(
                    (basketItem)=> basketItem.id===action.id
                );
                let newBasket = [...state.basket]
                if (index >= 0){
                    newBasket.splice(index,1)
                }
                else{
                    console.warn(
                        'cant remove product (id: ${actin.id}) as its not in basket'
                    )
                }
                return {
                    ...state,
                    basket:newBasket,
                }

                case "SET_USER":
                    return{
                        ...state,
                        user:action.user
                    }
                    case "EMPTY_BASKET":
                        return {
                          ...state,
                          basket: [],
                        };

            default:
                return state;
    }
};


 


export default reducer;