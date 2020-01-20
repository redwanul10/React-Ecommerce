import React from 'react';

const Alert = ({anim}) => {
    return ( 
        <div className={`product_alert ${anim}`}>
            <div className="alert_Title">Product Successfully Added to the Cart</div>
            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        </div>
    );
}
 
export default Alert;