import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
    return (
        <div className='descriptionbox'>
            <div className="descriptionbox-navigator">
                <div className="descriptionbox-nav-box">
                    Description
                </div>
                <div className="descriptionbox-nav-box">
                    Reviews (155)
                </div>
            </div>
            <div className="descriptionbox-description">
                <p>The Beretta 92fs is a variant of the Beretta 92 series, and its predecessor, the Beretta 92FS was adopted as the standard sidearm for the United States military in 1985. This widespread military adoption greatly contributed to its fame, as it became the standard-issue sidearm for U.S. armed forces for many years.</p>
                <p>All air pistols are provided with free of charge license and club membership from our shooting club due to legal reasons. License procedure may take up to 14 business days. Pistols are delivered after the licensed has been signed by a company director and the club president. Copies of National Identity card, water bill for address verification and a recently taken photograph required to proceed with any order.</p>
            </div>
        </div>
    )
}

export default DescriptionBox
