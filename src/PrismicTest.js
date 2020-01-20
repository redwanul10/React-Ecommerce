import React from 'react';
import Prismic from 'prismic-javascript'

const uri = "https://redwan.cdn.prismic.io/api/v2"
const client = Prismic.client(uri)



const PrismicTest = () => {
    client.query(
        Prismic.Predicates.at('document.type', 'posts')
    ).then(res=>console.log(res.results))
    
    return (
        <div>
            prismic
        </div>
    );
};

export default PrismicTest;