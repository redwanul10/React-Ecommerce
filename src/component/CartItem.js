import React from 'react'
import {gql} from 'apollo-boost'
import {Link} from 'react-router-dom'

// Refetch Query
const re=gql`
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
}

`
                      
const CartItem =({data,removeToCart,increment,decrement})=>{

	// Create String for Url
	const urlString = data.title.split(' ').join('-')
	const id = data.id
    return(
			<li class="header-cart-item">
				{/* Product Image */}
				<div class="header-cart-item-img">
					<img src={data.image} alt="IMG"/>
				</div>

				<div class="header-cart-item-txt">
					{/*Product Title */}
					<Link to={`/product/${urlString}?id=${id}`} class="block2-name dis-block s-text3 p-b-5" tabindex="0">
						{data.title}
					</Link>

					{/*Product Price and Quantity */}
					<span class="header-cart-item-info">
						{data.quantity} x ${data.price}
					</span>

					{/*Increment Button */}
					<button onClick={e=>{increment({variables:{id:data.id},refetchQueries:[{fetchPolicy:"cache-only",query:re,variables:{pid:data.id}}]})}}class="cBTN btn-num-product-up color1 flex-c-m size7 bg8 eff2">
						<i class="fs-12 fa fa-plus" aria-hidden="true"></i>
					</button>
					{/*Decrement Button */}
					<button onClick={e=>{decrement({variables:{id:data.id},refetchQueries:[{fetchPolicy:"cache-only",query:re,variables:{pid:data.id}}]})}} class="cBTN btn-num-product-down color1 flex-c-m size7 bg8 eff2">
						<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
					</button>
					{/*Checkout Button */}
					<button onClick={e=>removeToCart({variables:{id:data.id},refetchQueries:[{query:re,variables:{pid:data.id}}]})}class="cBTN btn-num-product-down color1 flex-c-m size7 bg8 eff2">
						<i class="fa fa-trash" aria-hidden="true"></i>
					</button>
				</div>
			</li>
    )
}

export default CartItem