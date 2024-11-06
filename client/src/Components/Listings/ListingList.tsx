import React, { useContext } from 'react';
import ListingItem from './ListingItem';
import './ListingList.css';
import { AppContext } from '../../context/AppContext';
import { Category } from '../../types/types';

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
    const { category, minPrice, maxPrice } = useContext(AppContext);

    const filteredListings = listings.filter((listing) => {
        const matchesCategory = category === Category.All || listing.category === category;
        const withinPriceRange = listing.price >= minPrice && listing.price <= maxPrice;
        return matchesCategory && withinPriceRange;
    });

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
