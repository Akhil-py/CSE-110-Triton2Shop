import React from 'react';
import './product.css';
import { Navbar } from '../Navbar/Navbar';

const GEISELIMAGE = '/chicken.jpeg'

type ProductItemProps = {
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    distance: number;
    sellerName: string;
    sellerUsername: string;
    sellerContact: string;
};

const ProductPage: React.FC<ProductItemProps> = ({
    title = 'Title',
    price = 69,
    imageUrl = 'beeswax',
    description = 'amogus',
    distance = 69,
    sellerName = 'John Smith',
    sellerUsername = 'TritonLowBaller',
    sellerContact = '123-456-7890'
}) => {
    const favouriteHandler = () => {
        console.log('Favourited!');
    };

    const buyHandler = () => {
        console.log('Bought!');
    };

    return (
        <div className='product-page'>
            <Navbar />
            <div className='product-item'>
                <div className='product-name'>
                    <h1>{title}</h1>
                </div>
                <body>
                    <div className='product-image'>
                        <img src={GEISELIMAGE} alt={title} />
                    </div>
                    <div className='product-info'>
                        <div className='seller-info'>
                            <div className='seller-details'>
                                <p id='name'>Name: {sellerName}</p>
                                <p id='username'>Username: {sellerUsername}</p>
                                <p id='contact'>Contact Info: {sellerContact}</p>
                            </div>
                            <p id='price'>Price: ${price}</p>
                            <p id='distance'>Distance: {distance} miles</p>
                        </div>
                        <div className='product-buttons'>
                            <div className='favourite-button'>
                                <button onClick={favouriteHandler}>Favourite</button>
                            </div>
                            <div className='buy-button'>
                                <button onClick={buyHandler}>Buy</button>
                            </div>
                        </div>
                        <div className='product-description'>
                            <p>{description}</p>
                        </div>
                    </div>
                </body>
            </div>
        </div>
    );
};

export default ProductPage;
