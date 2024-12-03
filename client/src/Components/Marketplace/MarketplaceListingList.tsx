import React, { useContext } from 'react';
import MarketplaceListingItem from './MarketplaceItem';
import './MarketplaceListingList.css';
import { AppContext } from '../../context/AppContext';
import { Category, Condition } from '../../types/types';

//sellerId, itemName, price, itemPicture, category, condition, description
type MarketplaceListing = {
    id: number;
    itemName: string;
    price: number;
    itemPicture: string;
    category: Category;
    condition: Condition;
};

type MarketplaceListingListProps = {
    MarketplaceListings: MarketplaceListing[];
};

const MarketplaceListingList: React.FC<MarketplaceListingListProps> = ({ MarketplaceListings }) => {
    const { category, minPrice, maxPrice, conditions, searchQuery } = useContext(AppContext);
    const filteredMarketplaceListings = MarketplaceListings.filter((MarketplaceListing) => {
        console.log("curr category is " + MarketplaceListing.category);
        const matchesCategory = category === Category.All || MarketplaceListing.category === category;
        const withinPriceRange = MarketplaceListing.price >= minPrice && MarketplaceListing.price <= maxPrice;
        const matchesCondition = conditions.length === 0 || conditions.includes(MarketplaceListing.condition);
        console.log("curr condition is " + MarketplaceListing.condition);
        //const matchesSearch = MarketplaceListing.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && withinPriceRange && matchesCondition; //&& matchesSearch;
    });

    return (
        <div className="MarketplaceListing-list">
            {filteredMarketplaceListings.map((MarketplaceListing) => (
                <MarketplaceListingItem
                    key={MarketplaceListing.id}
                    itemName={MarketplaceListing.itemName}
                    price={MarketplaceListing.price}
                    itemPicture={MarketplaceListing.itemPicture}
                />
            ))}
        </div>
    );
};

export default MarketplaceListingList;
