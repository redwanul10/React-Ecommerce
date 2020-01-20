import React from 'react';
import './App.css';
import ProductSection from './component/ProductSection'
import HeroSection from './component/HeroSection'
import InstagramSection from './component/InstagrapmSection'
import DiscountSection from './component/DiscountSection'
import Loading from './component/Loading'
import Alert from './component/Alert'
import {gql} from 'apollo-boost'
import {useQuery,useMutation,useApolloClient} from "@apollo/react-hooks"



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
    cartModal @client
    successModal @client
  }
  
`

const queryProducts = gql`
  query MyQuery {
    
  allHomepages {
    edges {
      node {
        body {
          ... on HomepageBodyHeader {
            type
            primary {
              header_description
              header_image
              header_title
            }
          }
          ... on HomepageBodyInstagram_section {
            type
            fields {
              image
            }
            primary {
              insta_title
            }
          }
          ... on HomepageBodyDiscount_area {
            type
            label
            fields {
              cta_btn
              image
              section_title
            }
          }
        }
      }
    }
  }
    allProductss (first:4){
      edges {
        node {
          price
          product_image
          title
          sku_id
          _meta {
            id
          }
        }
      }
    }
  }
`


const mutationAddToCart = gql`
  mutation($id:Id $price:Int $title:String $skuId:String $image:String){
    addToCart(id:$id, price:$price title:$title skuId:$skuId image:$image)@client
  }
`



function App() {
  
  const client = useApolloClient()
  const {data}      = useQuery(queryCart)
  const [addToCart] = useMutation(mutationAddToCart)
  const products    = useQuery(queryProducts)
  
  console.log(data)

  if(products.loading) return <Loading/>
  if(products.error || !data) return null;
  
  const homepageData = products.data.allHomepages.edges[0].node.body
  const hero = homepageData.find(data => data.type === "header")
  const discount = homepageData.find(data => data.type === "discount_area")
  const insta = homepageData.find(data => data.type === "instagram_section")
  return (
    
    <div className="App">
      <HeroSection data={hero}/>
      <ProductSection products={products} addToCart={addToCart}/>
      <DiscountSection data={discount.fields}/>
      <InstagramSection data={insta}/>
      <Alert anim={data.successModal ? "fadein":"fadeout"}/>
      
      {data.successModal &&(
        setTimeout(()=>{
          client.writeData({data:{successModal:false}})
        },1300)
      )}

    </div>
  );
}

export default App;
