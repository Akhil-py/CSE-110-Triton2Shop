import React, { useState } from 'react';
import './FavoritesList.css'

//type for favorites items, included distance
type FavoriteItem = {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    distance: number;
};

//Favorite List functions
const FavoriteList: React.FC<{ items: FavoriteItem[] }> = ({ items }) => {
    //useState to update the list of items after removal
    const [favoriteItems, setFavoriteItems] = useState(items);

    //remove Item from favorites function
    const removeItem = (indexToRemove: number) => {
        setFavoriteItems(favoriteItems.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div className="favorites-container">
            <h1>Favorites</h1>
            {favoriteItems.map((item, index) => (
                <div key={index} className="favorite-item">
                    <div className="grid-container">
                        <h2 className="item-name">{item.name}</h2>
                        <img src={item.imageUrl} alt={item.name} className="item-image" />
                        <div className="info-section">
                            <div className="distance">Distance: {item.distance} km</div>
                            <button className="buy-button">Buy</button>
                        </div>
                        <p className="description">{item.description}</p>
                        <div className="remove-button" onClick={() => removeItem(index)}>&times;</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

//placeholder items for favorites list testing
const placeholderItems: FavoriteItem[] = [
    {
        name: 'Happiness',
        price: 1000000,
        description: 'This is a description for product 1. This is a test to see how the placement of the desciption box is like when there is a very descriptive customer. Please I dont want to do this anymore. I wanna drop this class.',
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

//export for the App
export default function App() {
    return <FavoriteList items={placeholderItems} />;
}