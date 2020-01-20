import React from 'react';
import {Link} from 'react-router-dom'

const HeroSection = ({data}) => {
    // Section Background
    const background={background:`url(${data.primary.header_image.url}) center center /cover`}
    
    return ( 
        <div className="HeroSection" style={background}>
            <div className="content">
                    <div>{data.primary.header_description}</div>
                    <h1>{data.primary.header_title}</h1>
                    <Link to="/shop">shop now</Link>
            </div>
        </div>
     );
}
 
export default HeroSection;