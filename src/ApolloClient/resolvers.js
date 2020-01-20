import {gql} from 'apollo-boost'

const queryCart = gql`
{
  cart @client{
    price
    quantity
    id
    skuId
  }
  total @client
}
`

const resolvers={
    Query:{
      cart:(_,arg,{cache})=>{
        const cartItems = cache.readQuery({query:queryCart})
        console.log(cartItems)
        return cartItems
      },

      getProductQuantity:(_,{id},{cache})=>{
        const {cart} = cache.readQuery({query:queryCart})
        console.log(cart.length === 0)
        if (cart.length === 0) return 0
        const product = cart.find(item=> item.id === id)
        console.log(product)
        if(!product){
          return 0
        }else{
          return product.quantity
        }
      },
    },
    
    Mutation:{
      increment:(_,{id},{cache})=>{
        const {cart} = cache.readQuery({query:queryCart})
        
        const cartItems = cart
        const productIndex = cart.findIndex(product=> product.id === id)
        if(productIndex === -1) return;

        const quantity = cartItems[productIndex].quantity
        cartItems[productIndex].quantity += 1;
        console.log("increment called")
        console.log(cache)
        


        //total price
        var totalprice = 0
        cart.forEach(item=>{
          return totalprice+= item.quantity * item.price
        })

        cache.writeData({data:{cart:cartItems,total:totalprice}})
      },

      decrement:(_,{id},{cache})=>{
        const {cart} = cache.readQuery({query:queryCart})
        
        const cartItems = cart
        const productIndex = cart.findIndex(product=> product.id === id)
        if(productIndex === -1) return;
        const quantity = cartItems[productIndex].quantity
        cartItems[productIndex].quantity = quantity > 1 ? quantity-1 : 1;
        console.log("decrement called")
        


        //total price
        var totalprice = 0
        cart.forEach(item=>{
          return totalprice+= item.quantity * item.price
        })

        cache.writeData({data:{cart:cartItems,total:totalprice}})
      },

      addToCart:(_,{id,price,title,skuId,image},{cache})=>{
        console.log("add to cart")
        console.log(price,skuId,title)
        const {cart,total} = cache.readQuery({query:queryCart})
        
        const product = {
          id,
          price,
          quantity:1,
          title,
          skuId,
          image,
          __typename:"product"
        }

        const inCart = cart.findIndex(item=>item.id === id)
        console.log(inCart)
        if(inCart > -1){
          alert("product already in cart")
          return;
        };
        
        const cartItems = [product,...cart];

        var totalprice = 0
        cartItems.forEach(item=>{
          return totalprice+= item.quantity * item.price
        })
        

        console.log(cart,total)
        cache.writeData({data:{
          cart:cartItems,
          total:totalprice,
          countCartItem:cartItems.length,
          successModal:true
        }})
        return {
          "id": 1,
          "price": 100,
          "quantity":1,
          "__typename": "product"
        }
      },
      
      removeToCart:(_,{id},{cache})=>{
        console.log("remove to cart")
        const {cart,total} = cache.readQuery({query:queryCart})
        
        console.log(cart,total)

        const cartItems = cart.filter(item=>item.id !== id)
        console.log(cartItems)

        var totalprice = 0
        if(cartItems){
          cartItems.forEach(item=>{
            return totalprice+= item.quantity * item.price
          })
        }
        cache.writeData({data:{
          cart:cartItems,
          total:totalprice,
          countCartItem:cartItems.length
        }})
        return {
          "id": 1,
          "price": 100,
          "__typename": "product"
        }
      },

      checkOut:(_,args,{cache})=>{
        const {cart} = cache.readQuery({query:queryCart})
        var items=[]
        console.log(cart)
        if(cart.length === 0 ) return;
        cart.forEach(product=>{
          console.log(product.name)
          const obj={
            sku: product.skuId,
            quantity: product.quantity
          }
          items.push(obj)
        })
        console.log(items)
        const stripe = window.Stripe('pk_test_BYs8Wg49TP1GaFadS6jtoca400lEuWHxz4')
        stripe.redirectToCheckout({
          items,
          successUrl: 'https://react-eecommerce.netlify.com/success',
          cancelUrl: 'https://react-eecommerce.netlify.com/cancel',
        });
        console.log("checkout Complete")
      },

      toggleCartModal:(_,args,{cache})=>{
        console.log("open cart modal")
          
          const query = gql`
            query{
              cartModal @client
            }
          `
          const {cartModal} = cache.readQuery({query})
          cache.writeData({
            data:{
              cartModal:cartModal === true ? false:true
            }
          })
          
      },

      toogleMobileMenu:(_,args,{cache})=>{
        console.log("open cart modal")
          
          const query = gql`
            query{
              mobileMenu @client
            }
          `
          const {mobileMenu} = cache.readQuery({query})
          cache.writeData({
            data:{
              mobileMenu:(mobileMenu === true) || args.close ? false:true
            }
          })
          
      }
    }
}

export default resolvers