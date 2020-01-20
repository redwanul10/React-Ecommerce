import React,{useState,useMemo} from 'react';
import CategoryList from './CategoryList.js'
import Loading from './Loading.js'
import Product from './Product'
import Alert from './Alert'
import {gql} from 'apollo-boost'
import {useQuery,useMutation,useApolloClient,useLazyQuery} from "@apollo/react-hooks"

// Query Products and Categories
const queryProducts = gql`
query MyQuery($name:String){
    
    allCategorys {
        edges {
          node {
            category_name
            _meta{
                id
            }
          }
        }
    }

    allProductss(where: {category: $name}, first: 10) {
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
    successModal @client
}
`
// Add to Cart Mutation
const mutationAddToCart = gql`
  mutation($id:Id $price:Int $title:String $skuId:String $image:String){
    addToCart(id:$id, price:$price title:$title skuId:$skuId image:$image)@client
  }
`

const Shop = () => {
    //Component State
    const [productsData,setProductsData] = useState([]);
    const [price,setPrice] = useState({min:0,max:100})
    
    // Set Specific Categories Products
    // on refetch Query Complete
    const onComplete =(data)=>{
        console.log("yes its complited")
        setProductsData(data.allProductss.edges)
    }

    // GraphQL Hooks
    const client        = useApolloClient()
    const products      = useQuery(queryProducts,{onCompleted:onComplete})
    const [addToCart]   = useMutation(mutationAddToCart)
    const [click,{loading,data}] = useLazyQuery(queryProducts,{onCompleted:onComplete})
    
    // Loading
    if(products.loading )    return <Loading/>

    if(products.error) console.log(products.error)
    if(!products.data)      return <div>data undefined</div>

    // Click Function for Categories
    const clickHandelar = (name) =>{
        if(name ==="all")return click()
        click({
            variables:{
                name
            }
        })
    }

    const items = products.data.allCategorys.edges
    return ( 
        
        <div className="shop p-t-66">
            <div className="container">
                <div className="row">
                    <div className="col-md-3" >
                    {/* Category List */}
                        <CategoryList 
                        price={price}
                        setPrice={setPrice}
                        items={items?items:[]} clickHandelar={clickHandelar}/>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            {/* Price Range Filter */}
                            {productsData && productsData.map(Prdt =>{
                                if( price.min < Prdt.node.price && price.max > Prdt.node.price){
                                    return(
                                    // Product List
                                        <Product 
                                        data={Prdt.node}
                                        addToCart={addToCart}
                                        col={4}
                                        />
                                    )
                                }
                            }) }
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Alert Modal */}
            <Alert anim={products.data.successModal ? "fadein":"fadeout"}/>
            {products.data.successModal &&(
                setTimeout(()=>{
                    client.writeData({data:{successModal:false}})
                },1300)
            )}
        
        </div>
     );
}
 
export default Shop;