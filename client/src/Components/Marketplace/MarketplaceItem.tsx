import React from 'react';
import './MarketplaceItem.css'
const API_BASE_URL = "http://localhost:5000";
type MarketplaceItemProps = {
    itemName: string;
    price: number;
    itemPicture: string;
    id : number;
};

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({ id, itemName, price, itemPicture }) => {
    const imagePath = `${API_BASE_URL}${itemPicture}`;
    return (
        <a href={`/product/${id}`}>
            <div className="Marketplace-item">
                <img src={imagePath} alt={itemName} className="Marketplace-image" />
                <div className='Marketplace-description'>
                    <h3>{itemName}</h3>
                    <p>${price}</p>
                </div>
            </div>
        </a>
    );
};

export default MarketplaceItem;
