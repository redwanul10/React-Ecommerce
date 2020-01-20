import {gql} from 'apollo-boost'

const typeDefs= gql`
  type Query{
    cart:[product]
    total:String
    countCartItem:String
    cartModal:Boolean
    mobileMenu:Blooean
    mobileMenu:Blooean
    getProductQuantity:Int
  }

  type product{
    id:Id
    price:Int
    quantity:Int
    title:String
    skuId:String
    image:String
  }

  
  type mutation{
    addToCart:product
    print:String
    removeToCart:Product
    increment:Int
    decrement:Int
    checkOut:String
    successModal:Blooean
    toogleMobileMenu:Blooean
  }
`
export default typeDefs;

