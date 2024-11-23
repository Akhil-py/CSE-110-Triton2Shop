import { Navbar } from "../Components/Navbar/Navbar";
import './HomePage.css';
import ListingList from "../Components/Marketplace/MarketplaceListingList";
import { Category, Condition } from "../types/types";
import Filter from "../Components/Filter/Filter";
import { mockListings } from "../types/types";
export const HomePage = () => {

    return (
        <div className='container'>
            <Navbar />
            <div className="homepage-content">
                <Filter />
                <ListingList MarketplaceListings={mockListings} />
            </div>
        </div>
    );
};
