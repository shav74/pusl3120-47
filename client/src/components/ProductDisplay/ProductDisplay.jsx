import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
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
                <div className="productdisplay-right-star">
                    <img src={star_icon} />
                    <img src={star_icon} />
                    <img src={star_icon} />
                    <img src={star_icon} />
                    <img src={star_dull_icon} />
                    <p>(155)</p>
                </div>
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
                    <div className="productdisplay-img-list">
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                        <img src={product.image} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
