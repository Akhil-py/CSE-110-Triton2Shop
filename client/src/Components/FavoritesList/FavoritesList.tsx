import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesList.css';
import { fetchCurrentUserId, getUserFavorites, deleteFavorite, createRequest } from "../../utils/listing-utils";

// Type for favorite items
type FavoriteItem = {
    itemId: number;
    itemName: string;
    price: number;
    description: string;
    itemPicture: string;
};


    const FavoritesList: React.FC = () => {
        const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
        const [itemCount, setItemCount] = useState(0);
        const [userId, setUserId] = useState<number | null>(null);
        const API_BASE_URL = "http://localhost:5000";
    
        useEffect(() => {
            const loadUserData = async () => {
                const userId = await fetchCurrentUserId();
                setUserId(userId);
                try {
                    const response = await getUserFavorites(userId); // Fetch the favorites data
                    console.log("Response from API:", response);
        
                    // Safely access the 'favorites' property
                    const items = response?.favorites || [];
                    console.log("Extracted favorites:", items);
        
                    setFavoriteItems(Array.isArray(items) ? items : []); // Ensure items is an array
                    setItemCount(items.length); // Update the count based on the length of the array
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                    setFavoriteItems([]); // Default to an empty array on error
                }
            };
        
            loadUserData();
        }, []);
        
    
        // Remove item from favorites
        // const removeItem = (indexToRemove: number) => {
        //     setFavoriteItems(favoriteItems.filter((_, index) => index !== indexToRemove));
        //     setItemCount((prevCount) => prevCount - 1);
        // };

        const removeItem = async (indexToRemove: number) => {
            if (!userId || indexToRemove < 0 || indexToRemove >= favoriteItems.length) {
                console.error("Invalid user ID or index");
                return;
            }
            const itemToRemove = favoriteItems[indexToRemove];
            try {
                // Call the API to delete the favorite
                await deleteFavorite(userId, itemToRemove.itemId);
        
                // Update the state to remove the item from the list
                setFavoriteItems((prevItems) => 
                    prevItems.filter((_, index) => index !== indexToRemove)
                );
        
                // Adjust the item count
                setItemCount((prevCount) => prevCount - 1);
        
                console.log(`Item ${itemToRemove.itemName} removed successfully.`);
            } catch (error) {
                console.error("Failed to remove item:", error);
            }
        };

        const buyItem = async (indexToRemove: number) => {
            if (!userId || indexToRemove < 0 || indexToRemove >= favoriteItems.length) {
                console.error("Invalid user ID or index");
                return;
            }
            const itemToBuy = favoriteItems[indexToRemove];
            try {
                //call API to delete from favorites
                await deleteFavorite(userId, itemToBuy.itemId);
                console.log(`Item ${itemToBuy.itemName} removed successfully.`);

                // Call the API to create request
                const requestData = await createRequest(itemToBuy.itemId, userId);
                console.log('Request created:', requestData);
                window.location.href = "http://localhost:3000/rq-tracker";
                
            } catch (error) {
                console.error("Failed to remove item:", error);
            }
        };

        
    
        if (!userId) {
            return <div>Loading user data...</div>; // Handle the case where userId is invalid
        }
    
        return (
            <div className='MainBackground'>
                <h1 className='title'>Favorite Items</h1>
                
                {/* Navbar */}
                <nav className="favoritenavbar">
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/favorites">Favorites</Link>
                        </li>
                        <li className="navbar-item">
                            <a href="#orders">Orders</a>
                        </li>
                        <li className="navbar-item">
                            <a href="#profile">Profile</a>
                        </li>
                    </ul>
                </nav>
    
                {/* Handle empty favoriteItems */}
                {favoriteItems.length === 0 ? (
                    <div>No favorite items to display.</div>
                ) : (
                    <div>
                        {favoriteItems.map((item, index) => (
                            <div key={item.itemName} className="favorite-item" data-testid="items">
                                <img 
                                    src={`${API_BASE_URL}${item.itemPicture}`} 
                                    alt={item.itemName} 
                                    className="item-image" 
                                />
                                <div className="info-section">
                                    <h2 className="item-name">{item.itemName}</h2>
                                    <button className="buy-button" onClick={() => buyItem(index)}>Buy</button>
                                    <p className="description">{item.description}</p>
                                </div>
                                <div
                                    className="remove-button"
                                    onClick={() => removeItem(index)}
                                    data-testid="x"
                                >
                                    X
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };
    
    export default FavoritesList;
    