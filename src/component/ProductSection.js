import React from 'react';
import Product from './Product.js'

const ProductSection = ({products,addToCart}) => {
    return ( 
        <div className="productSection p-t-45 p-b-50">
            <h3 class="m-text5 t-center">Our Products</h3>
            <div class="container ">
                <div class="row">
                    {products.data && products.data.allProductss.edges.map(Prdt =>(
                        <Product 
                        data={Prdt.node}
                        addToCart={addToCart}
                        col={3}
                        />
                    )) }
                </div>
            </div>
        </div>
     );
}
 
export default ProductSection;