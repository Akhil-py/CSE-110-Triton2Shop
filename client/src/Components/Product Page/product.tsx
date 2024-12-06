import React, { useState, useEffect } from 'react';
import './product.css';
import { Navbar } from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { MarketplaceListing, MarketplaceListingWithSeller } from '../../types/types';
import { fetchListings, fetchItemWithSeller } from "../../utils/listing-utils";

const API_BASE_URL = "http://localhost:5000";

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [itemWithSeller, setItemWithSeller] = useState<MarketplaceListingWithSeller | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const userId = 1; // Replace with the actual logged-in user's ID, e.g., from context or props

    useEffect(() => {
        const loadListings = async () => {
            try {
                const fetchedListings = await fetchListings();
                setListings(fetchedListings);
            } catch (error) {
                console.error("Failed to load listings:", error);
            }
        };

        const loadItemWithSeller = async () => {
            try {
                const fetchedItemWithSeller = await fetchItemWithSeller(parseInt(id || '9999'));
                setItemWithSeller(fetchedItemWithSeller);
                console.log("product id: ", id);
                console.log("fetchedItemWithSeller Data for id: ", fetchedItemWithSeller);
            } catch (error) {
                console.error("Failed to load item with seller:", error);
            }
        };

        loadListings(); 
        loadItemWithSeller();
    }, [id]);

    const product = listings.find((item) => item.id === parseInt(id || '', 10));
    if (!product) {
        return <div>Product not found</div>;
    }

    const favouriteHandler = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    itemId: product.id,
                }),
            });

            if (response.ok) {
                setIsFavorited(true); // Mark the item as favorited
                console.log('Added to favorites');
            } else {
                console.error('Failed to add to favorites:', response.statusText);
            }
        } catch (error) {
            console.error('Error favoriting item:', error);
        }
    };

    const buyHandler = () => {
        console.log('Bought!');
    };

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
                            <img src={`${API_BASE_URL}${product.itemPicture}`} alt={product.itemName} />
                        </div>
                        <div className='product-info'>
                            <div className='seller-info'>
                                <div className='seller-details'>
                                    <p id='name'>Name: {itemWithSeller?.sellerName}</p>
                                    <p id='username'>Email: {itemWithSeller?.sellerEmail}</p>
                                </div>
                                <p id='price'>Price: ${product.price}</p>
                                <p id='distance'>Distance: { } miles</p>
                            </div>
                            <div className='product-buttons'>
                                <div className='favourite-button'>
                                    <button onClick={favouriteHandler}>
                                        {isFavorited ? 'Favorited' : 'Favorite'}
                                    </button>
                                </div>
                                <div className='buy-button'>
                                    <button onClick={buyHandler}>Buy</button>
                                </div>
                            </div>
                            <div className='product-description'>
                                <p>Condition: {product.condition}</p>
                                <p>Description: {product.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;