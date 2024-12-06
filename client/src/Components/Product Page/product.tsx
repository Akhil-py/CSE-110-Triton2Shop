import React, { useState, useEffect } from 'react';
import './product.css';
import { Navbar } from '../Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { MarketplaceListing, MarketplaceListingWithSeller } from '../../types/types';
import { fetchListings, fetchItemWithSeller, createRequest, fetchCurrentUserId } from "../../utils/listing-utils";
const API_BASE_URL = "http://localhost:5000";

const ProductPage: React.FC = () => {
    const favouriteHandler = () => {
        console.log('Favourited!');
    };

    // const buyHandler = () => {
    //     console.log('Bought!');
    // };
    const buyHandler = async (itemId: number) => {
        try {
            const userId = await fetchCurrentUserId();
            if (userId){
                console.log('Bought!');
                const requestData = await createRequest(itemId, userId);
                console.log('Request created:', requestData);
                // Navigate to the rq-tracker page after the request is successfully created
                window.location.href = "http://localhost:3000/rq-tracker";
            }
        } catch (error) {
            console.error('Error creating request:', error);
            alert("Error requesting item");
        }
    };
       
    const { id } = useParams<{ id: string }>();
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    const [itemWithSeller, setItemWithSeller] = useState<MarketplaceListingWithSeller | null>(null);
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
                                    <p id='name'>Name: { itemWithSeller?.sellerName }</p>
                                    <p id='username'>Email: { itemWithSeller?.sellerEmail }</p>
                                </div>
                                <p id='price'>Price: ${product.price}</p>
                                <p id='distance'>Distance: { } miles</p>
                            </div>
                            <div className='product-buttons'>
                                <div className='favourite-button'>
                                    <button onClick={favouriteHandler}>Favorite</button>
                                </div>
                                <div className="buy-button">
                                    {/* Call buyHandler with the product's id and the buyer's id */}
                                    <button onClick={() => buyHandler(product.id)}>Buy</button>
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