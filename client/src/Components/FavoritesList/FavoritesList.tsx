import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesList.css';

// Type for favorite items from the backend
type FavoriteItem = {
    itemId: number;
    itemName: string;
    price: number;
    description: string;
    itemPicture: string;
    distance: number; // You can calculate this or fetch it if necessary
};

// Favorite List component
const FavoriteList: React.FC<{ userId: number }> = ({ userId }) => {
    const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);
    const [itemCount, setItemCount] = useState(0);
    const [error, setError] = useState<string | null>(null); // Add error state

    // Fetch favorite items from the backend
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(`/favorites/${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch favorites'); // Throw error if response is not ok
                }
                const data = await response.json();
                setFavoriteItems(data.favorites);
                setItemCount(data.favorites.length);
                setError(null); // Clear error state if fetch is successful
            } catch (error: any) {
                console.error('Error fetching favorites:', error);
                setError('Failed to load favorite items. Please try again later.'); // Set error message for UI
            }
        };

        fetchFavorites();
    }, [userId]);

    // Function to remove item from the list (local state only)
    const removeItem = (indexToRemove: number) => {
        setFavoriteItems(favoriteItems.filter((_, index) => index !== indexToRemove));
        setItemCount((prevCount) => prevCount - 1);
    };

    return (
        <div className='MainBackground'>
            <h1 className='title'>Favorite Items</h1>

            {/* Section dedicated to the navbar */}
            <nav className="favoritenavbar">
                <ul className="navbar-list">
                    <li className="navbar-item">
                        <Link to="/">Home</Link> {/* Link to Home Page */}
                    </li>
                    <li className="navbar-item">
                        <Link to="/favorites">Favorites</Link> {/* Link to Favorites */}
                    </li>
                    <li className="navbar-item">
                        <a href="#orders">Orders</a>
                    </li>
                    <li className="navbar-item">
                        <a href="#profile">Profile</a>
                    </li>
                </ul>
            </nav>

            {/* Error message display */}
            {error && <div className="error-message">{error}</div>}

            {/* Section dedicated to formatting the items */}
            <div>
                {favoriteItems.map((item, index) => (
                    <div key={item.itemId} className="favorite-item" data-testid="items">
                        <img src={item.itemPicture} alt={item.itemName} className="item-image" />
                        <div className="info-section">
                            <h2 className="item-name">{item.itemName}</h2>
                            <div className="distance">Distance: {item.distance} km</div>
                            <button className="buy-button">Buy</button>
                            <p className="description">{item.description}</p>
                        </div>
                        <div className="remove-button" onClick={() => removeItem(index)} data-testid='x'> X </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Example userId for testing (you can pass the actual userId based on logged-in user)
const userId = 1; // Replace with actual userId

// Export for the App
export default function App() {
    return <FavoriteList userId={userId} />;
}