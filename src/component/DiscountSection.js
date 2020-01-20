import React from 'react';
import {Link} from 'react-router-dom'

const DiscountSection = ({data}) => {

    return ( 
        //  Category (Man / Women) Section 
        <div className="discountSection banner2 bg5 p-t-55 p-b-55">
            <div className="container">
                <div className="row">
                    {/* Map Category */}
                    {data.map(item=>(
                        <div className="col-md-6 ">
                            <div className="lookBook">
                                <img src={item.image.url} alt=""/>
                                <div className="details">
                                    <h3 className="l-text1 fs-35-sm">{item.section_title[0].text}</h3>
                                    <Link to="/shop" className="s-text4 hov2 p-t-20 ">{item.cta_btn}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}
 
export default DiscountSection;