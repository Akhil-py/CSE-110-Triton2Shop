import React from 'react';
import './ListingItem.css'
type ListingItemProps = {
    title: string;
    price: number;
    imageUrl: string;
};

const ListingItem: React.FC<ListingItemProps> = ({ title, price, imageUrl }) => {
    return (
        <div className="listing-item">
            <img src={imageUrl} alt={title} className="listing-image" />
            <div className='listing-description'>
                <h3>{title}</h3>
                <p>${price}</p>
            </div>
        </div>
    );
};

export default ListingItem;
