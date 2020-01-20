import React from 'react'
import CartItem from './CartItem'
import {useQuery,useMutation} from "@apollo/react-hooks"
import {gql} from 'apollo-boost'

// Query Cache Data
const queryCart = gql`
  query {
    cart @client{
      id
      price
      quantity
      title
      skuId
      image
    }
    total @client
    countCartItem @client
  }
`
// Remove to Cart Mutation
const mutationRemoveToCart = gql`
  mutation($id:Id ){
   removeToCart(id:$id, price:$price)@client
  }
`
// Increment Quantity Mutation
const mutationIncrement = gql`
  mutation($id:Id ){
    increment(id:$id)@client
  }
`
// Decrement Quantity Mutation
const mutationdecrement = gql`
  mutation($id:Id ){
    decrement(id:$id)@client
  }
`
// Checkout Mutation
const mutationCheckOut = gql`
  mutation($id:Id ){
    checkOut(id:$id)@client
  }
`



const Cart =()=>{
  // GraphQl Hooks
    const {data:{cart,total}} = useQuery(queryCart)
    const [removeToCart] = useMutation(mutationRemoveToCart,{variables:{id:2}})
    const [increment] = useMutation(mutationIncrement)
    const [decrement] = useMutation(mutationdecrement)
    const [checkOut] = useMutation(mutationCheckOut)
    
    return(
      <div class="col-md-3 cart">
        <div class="header-cart header-dropdown show-header-dropdown">
          <ul class="header-cart-wrapitem">
            {cart.map(item=> (
              // Cart Items
                <CartItem data={item}
                removeToCart={removeToCart}
                increment={increment}
                decrement={decrement}/>
            ))}
            {/* No Cart MSG */}
            {cart.length === 0 &&(
              <div>No Products</div>
            )}
          </ul>

          {/* Cart Total */}
          <div class="header-cart-total">
              Total: ${total}
          </div>

          {/* Checkout */}
          <div class="header-cart-buttons">
              <div class="header-cart-wrapbtn">
                  <a onClick={checkOut}href="#" class="flex-c-m size1 bg1 bo-rad-20 hov1 s-text1 trans-0-4">
                      Check Out
                  </a>
              </div>
          </div>
        </div>
		  </div>
    )
}

export default Cart