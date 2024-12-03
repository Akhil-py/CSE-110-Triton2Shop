import React from 'react';
import './MarketplaceItem.css'
type MarketplaceItemProps = {
    itemName: string;
    price: number;
    itemPicture: string;
};

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({ itemName, price, itemPicture }) => {
    return (
        <div className="Marketplace-item">
            <img src={itemPicture} alt={itemName} className="Marketplace-image" />
            <div className='Marketplace-description'>
                <h3>{itemName}</h3>
                <p>${price}</p>
            </div>
        </div>
    );
};

export default MarketplaceItem;
