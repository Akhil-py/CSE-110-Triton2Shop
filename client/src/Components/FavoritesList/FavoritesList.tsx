import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FavoritesList.css';


// Type for favorite items, including distance
type FavoriteItem = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    distance: number;
};

// Favorite List component
const FavoriteList: React.FC<{ items: FavoriteItem[] }> = ({ items }) => {
    const [favoriteItems, setFavoriteItems] = useState(items);
    const [itemCount, setItemCount] = useState(items.length);

    //remove item function used later in handling
    const removeItem = (indexToRemove: number) => {
        setFavoriteItems(favoriteItems.filter((_, index) => index !== indexToRemove));
        setItemCount((prevCount) => prevCount - 1);
    };

    return (
        <div className='MainBackground'>
            <h1 className='title'>Favorite Items</h1>
            
            {/*Section dedicated to the navbar*/}
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

            {/*Section dedicated to formatting the items*/}
            <div>
    {favoriteItems.map((item, index) => (
        <div key={index} className="favorite-item" data-testid="items">
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <div className="info-section">
                <h2 className="item-name">{item.name}</h2>
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

// Placeholder items for testing
const placeholderItems: FavoriteItem[] = [
    {
        name: 'Happiness',
        price: 1000000,
        description: 'This is a description for product 1. This is a test to see how the placement of the description box is like when there is a very descriptive customer. Please I don’t want to do this anymore. I wanna drop this class.',
        imageUrl: 'https://via.placeholder.com/100',
        distance: 7000,
    },
    {
        name: 'Freedom',
        price: 150492,
        description: 'I want to be done with class so bad. PLEASE SOMEBODY HELP ME',
        imageUrl: 'https://via.placeholder.com/100',
        distance: 10,
    },
    {
        name: 'Legos',
        price: 5,
        description: 'Lowkey just want more Star Wars Legos',
        imageUrl: 'https://via.placeholder.com/100',
        distance: 55,
    },
];

// Export for the App
export default function App() {
    return <FavoriteList items={placeholderItems} />;
}