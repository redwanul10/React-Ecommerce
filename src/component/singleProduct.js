import React,{useEffect}from 'react';
import {gql} from 'apollo-boost'
import {useQuery,useMutation,useApolloClient} from "@apollo/react-hooks"
import quryString from 'querystring'
import Alert from './Alert'
import Loading from './Loading.js'

// Query Product
const query = gql`
query MyQuery ($pid:String){
    allProductss(id: $pid) {
      edges {
        node {
          price
          product_image
          title
          description
          sku_id
          _meta{
              id
          }
        }
      }
    }
    getProductQuantity(id:$pid) @client
    successModal @client
  }
`
const queryQuantity=gql`
  query q($pid:String){
    getProductQuantity(id:$pid) @client
  }
`
// Add to Cart Mutation
const mutationAddToCart = gql`
  mutation($id:Id $price:Int $title:String $skuId:String $image:String){
    addToCart(id:$id, price:$price title:$title skuId:$skuId image:$image)@client
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

const SingleProduct = (props) => {

  // Component State
    const search = props.location.search;
    const values = quryString.parse(search)

    // GraphQL Hooks
    const client      = useApolloClient()
    const [addToCart] = useMutation(mutationAddToCart)
    const [increment] = useMutation(mutationIncrement)
    const [decrement] = useMutation(mutationdecrement)
    const {data,loading,refetch} = useQuery(query,{variables:{pid:values["?id"]}})
    
    
  // Loading
    if(loading) return <Loading/>

    if(!data) return<h1>data undefined</h1>
    console.log(data)
    const product = data.allProductss.edges[0].node
    
    return (  
        <div className="singleProductPage">
            <div className="container">
                <div className="row">
                    {/* Alert Message */}
                    <Alert anim={data.successModal ? "fadein":"fadeout"}/>
                    {data.successModal &&(
                      setTimeout(()=>{
                        client.writeData({data:{successModal:false}})
                      },1300)
                    )}

                    <div className="col-md-1 height">
                        <img src={product.product_image.url} alt=""/>
                    </div>

                    <div className="col-lg-5 col-md-6">
                        <img src={product.product_image.url} alt=""/>
                    </div>

                    <div className="col-md-5">
                        <div className="product_details">
                        <h4 class="product-detail-name m-text16 p-b-13">
                            {product.title[0].text}
                        </h4>
                        <span class="m-text17">${product.price}</span>
                        <p class="s-text8 p-t-10">{product.description[0].text}</p>
                        
                        <div class="flex-w bo5 of-hidden m-r-22 m-t-10 m-b-10">
                            <button onClick={e=>{
                                decrement({variables:{
                                    id:product._meta.id
                                }}).then(res=>console.log(res))
                                refetch()
                            }}class="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                                <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
                            </button>
                            <input class="size8 m-text18 t-center num-product" type="number" name="num-product" value={data.getProductQuantity}/>
                            <button onClick={e=>{
                                increment({variables:{
                                    id:product._meta.id
                                }})
                                refetch()
                            }}class="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                                <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
                            </button>
                        </div>
                        <button onClick={e=>{
                            addToCart({
                                variables:{
                                    id:product._meta.id,
                                    price:product.price,
                                    title:product.title[0].text,
                                    skuId:product.sku_id,
                                    image:product.product_image.url
                                }
                            })
                            refetch()
                        }}class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                            Add to Cart
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default SingleProduct;