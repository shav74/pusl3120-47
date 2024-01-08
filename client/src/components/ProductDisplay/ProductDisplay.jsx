import React, { useContext } from 'react'
import './ProductDisplay.css'

import { ShopContext } from '../../Context/ShopContext'

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);

    return (
        <div className='productdisplay'>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <p className='productdisplay-right-category'>
                    <span>Category: </span>
                    {product.category}
                </p>

                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        Was: {product.old_price} LKR
                    </div>
                    <div className="productdisplay-right-price-new">
                    Now: {product.new_price} LKR
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    {product.description}
                </div>

                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
            </div>

            <div className="productdisplay-left">
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
