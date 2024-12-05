import React from 'react';
import './MarketplaceItem.css'
type MarketplaceItemProps = {
    itemName: string;
    price: number;
    itemPicture: string;
    id : number;
};

const MarketplaceItem: React.FC<MarketplaceItemProps> = ({ id, itemName, price, itemPicture }) => {
    return (
        <a href={`/product/${id}`}>
            <div className="Marketplace-item">
                <img src={itemPicture} alt={itemName} className="Marketplace-image" />
                <div className='Marketplace-description'>
                    <h3>{itemName}</h3>
                    <p>${price}</p>
                </div>
            </div>
        </a>
    );
};

export default MarketplaceItem;
