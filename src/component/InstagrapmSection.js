import React from 'react';

const InstagramSection = ({data}) => {
    return ( 
        <div className="InstagramSection p-t-45 p-b-50">
            <h3 class="m-text5 t-center">{data.primary.insta_title[0].text}</h3>
            {/* Instagram Photos */}
            {data.fields.map(imgObj =>(
                <div className="photo">
                    <img src={imgObj.image.url} alt=""/>
                </div>
            )) }
        </div>
     );
}
 
export default InstagramSection;