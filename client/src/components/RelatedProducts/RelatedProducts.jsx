import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Items from '../Items/Items'

const RelatedProducts = () => {

    const [new_collection, setNew_Collection] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/newproducts')
        .then((response)=>response.json())
        .then((data)=>setNew_Collection(data));
    },[])

    return (
        <div className='relatedproducts'>
            <h1>Related Products</h1>
            <div className="relatedproducts-item">
                {new_collection.map((item, i) => {
                    return <Items key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                })}
            </div>
        </div>
    )
}

export default RelatedProducts
