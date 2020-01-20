import React,{useState} from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";


const CategoryList = ({items,clickHandelar,setPrice,price}) => {
    
    console.log(items)
    if(items.length === 0) return <h4 class="m-text14 p-b-7">No Categories</h4>
    
    // Price Range Update Function
    const onSlide = (render, handle, value, un, percent) => {
        console.log(value)
        setPrice({
            min:value[0].toFixed(),
            max:value[1].toFixed(),
        })
    };

    return ( 
        <>
            <h4 class="m-text14 p-b-7">Categories</h4>
            <ul className="categoryList">
                <a href="#" onClick={e=>clickHandelar("all")}class="s-text13 active1">All</a>
                {/* Map Category List */}
                {items.map(item =>(
                    <li class="p-t-4" onClick={e=>clickHandelar(item.node._meta.id)}>
                        <a href="#" class="s-text13 active1">{item.node.category_name[0].text}</a>
                    </li>
                ))}
            </ul>

            <h4 class="m-text14 p-b-7">Price</h4>
            {/* Price Range Slider */}
            <Nouislider onSlide={onSlide}range={{ min: 0, max: 100 }} start={[0, 100]} connect />
            <div class="s-text3 p-t-10 p-b-10">Price range <bold>${price.min}</bold> - <bold>${price.max}</bold></div>
        </>
     );
}
 
export default CategoryList;