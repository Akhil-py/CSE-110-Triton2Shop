import React from 'react';
import './MarketplaceItem.css'
type MarketplaceItemProps = {
    title: string;
    price: number;
    imageUrl: string;
};

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({ title, price, imageUrl }) => {
    const imagePath = `http://localhost:5000${imageUrl}`;
    return (
        <div className="Marketplace-item">
            <img src={imagePath} alt={title} className="Marketplace-image" />
            <div className='Marketplace-description'>
                <h3>{title}</h3>
                <p>${price}</p>
            </div>
        </div>
    );
};

export default MarketplaceItem;
