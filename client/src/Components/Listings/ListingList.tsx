import React from 'react';
import ListingItem from './ListingItem';
import './ListingList.css';
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Category } from '../../types/types'
type Listing = {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    category: Category;
};

type ListingListProps = {
    listings: Listing[];
};

const ListingList: React.FC<ListingListProps> = ({ listings }) => {
    const { category } = useContext(AppContext);
    const filteredListings = category === Category.All
        ? listings
        : listings.filter(listing => listing.category === category);
    return (
        <div className="listing-list">
            {filteredListings.map((listing) => (
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
