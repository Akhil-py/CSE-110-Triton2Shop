import { Navbar } from "../Components/Navbar/Navbar";
import { useState, useEffect} from "react"
import './HomePage.css';
import MarketplaceListingList from "../Components/Marketplace/MarketplaceListingList";
import { Category, Condition } from "../types/types";
import Filter from "../Components/Filter/Filter";
import { fetchListings } from "../utils/listing-utils";
import { MarketplaceListing } from "../types/types";

export const HomePage = () => {
    const [listings, setListings] = useState<MarketplaceListing[]>([]);
    useEffect(() => {
        const loadListings = async () => {
            try {
                const fetchedListings = await fetchListings();
                setListings(fetchedListings);
            } catch (error) {
                console.error("Failed to load listings:", error);
            }
        };

    loadListings(); 
}, []);

    return (
        <div className='container'>
            <Navbar />
            <div className="homepage-content">
                <Filter />
                <MarketplaceListingList MarketplaceListings={listings} />
            </div>
        </div>
    );
};
