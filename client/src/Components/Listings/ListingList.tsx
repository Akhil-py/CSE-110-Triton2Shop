import React from 'react';
import ListingItem from './ListingItem';
import './ListingList.css';
type Listing = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
};

type ListingListProps = {
    listings: Listing[];
};

const ListingList: React.FC<ListingListProps> = ({ listings }) => {
    return (
        <div className="listing-list">
            {listings.map((listing) => (
                <ListingItem
                    key={listing.id}
                    title={listing.title}
                    price={listing.price}
                    imageUrl={listing.imageUrl}
                />
            ))}
        </div>
    );
};

export default ListingList;
