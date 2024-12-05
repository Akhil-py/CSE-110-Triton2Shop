import React, { useState, useEffect } from 'react';
import './product.css';
import { Navbar } from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { MarketplaceListing } from '../../types/types';
import { fetchListings } from "../../utils/listing-utils";
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

const ProductPage: React.FC = () => {
    const favouriteHandler = () => {
        console.log('Favourited!');
    };

    const buyHandler = () => {
        console.log('Bought!');
    };
    const { id } = useParams<{ id: string }>();
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    useEffect(() => {
        const loadListings = async () => {
            try {
                const fetchedListings = await fetchListings();
                setListings(fetchedListings);
            } catch (error) {
                console.error("Failed to load listings:", error);
            }
        };

    loadListings(); 
}, []);
    const product = listings.find((item) => item.id === parseInt(id || '', 10));
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='product-page'>
                <div className='product-item'>
                    <div className='product-name'>
                        <h1>{product.itemName}</h1>
                    </div>
                    <div className='product-body'>
                        <div className='product-image'>
                            <img src={product.itemPicture} alt={product.itemName} />
                        </div>
                        <div className='product-info'>
                            <div className='seller-info'>
                                <div className='seller-details'>
                                    <p id='name'>Name: { }</p>
                                    <p id='username'>Username: { }</p>
                                    <p id='contact'>Contact Info: { }</p>
                                </div>
                                <p id='price'>Price: ${product.price}</p>
                                <p id='distance'>Distance: { } miles</p>
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
                                <p>{product.condition}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
/*
title = 'Title',
    price = 69,
    imageUrl = 'beeswax',
    description = 'amogus',
    distance = 69,
    sellerName = 'John Smith',
    sellerUsername = 'TritonLowBaller',
    sellerContact = '123-456-7890'
*/