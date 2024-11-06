import { Navbar } from "../Components/Navbar/Navbar";
import './HomePage.css';
import ListingList from "../Components/Listings/ListingList";
import { Category, Condition } from "../types/types";
import Filter from "../Components/Filter/Filter";

export const HomePage = () => {

    const mockListings = [
        { id: 1, title: 'Glass Vase', price: 20, imageUrl: "https://images.pexels.com/photos/7486538/pexels-photo-7486538.jpeg/", category: Category.HomeGarden, condition: Condition.New },
        { id: 2, title: 'Mercedes-Benz', price: 10998, imageUrl: 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: Category.Vehicles, condition: Condition.New },
        { id: 3, title: 'Ipad Air 2015 5th Generation', price: 250, imageUrl: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: Category.Electronics, condition: Condition.New },
        // Add more items as needed
    ];

    return (
        <div className='container'>
            <Navbar />
            <div className="homepage-content">
                <Filter />
                <ListingList listings={mockListings} />
            </div>
        </div>
    );
};
