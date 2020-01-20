import React from 'react'
import {Link} from 'react-router-dom'


const Product = ({data,addToCart,removeToCart,col})=>{
    // Product Url
    const urlString = data.title[0].text.split(' ').join('-')
    const id = data._meta.id
    return(

        <div class={`col-lg-${col} col-sm-6`}>
                    <div class="block2">
                        <div class="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
                            {/* Product Image */}
                            <img src={data.product_image.url} alt=""/>
                            {/* Add to Cart BTN */}
                            <div class="block2-overlay trans-0-4">
                                <div class="block2-btn-addcart w-size1 trans-0-4">
                                    <a onClick={e=>
                                        addToCart({
                                            variables:{
                                                id:data._meta.id,
                                                price:data.price,
                                                title:data.title[0].text,
                                                skuId:data.sku_id,
                                                image:data.product_image.url
                                            }
                                        })
                                    }
                                    class="addtoCartBTN flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4" tabindex="0">
                                        Add to Cart
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="block2-txt p-t-20">
                            {/* Title */}
                            <Link to={`/product/${urlString}?id=${id}`} class="block2-name dis-block s-text3 p-b-5" tabindex="0">
                                {data.title[0].text}
                            </Link>
                            {/* Price */}
                            <span class="block2-price m-text6 p-r-5">
                                ${data.price}
                            </span>
                        </div>
            </div>
        </div>
    )
}

export default Product