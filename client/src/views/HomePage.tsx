import { Navbar } from "../Components/Navbar/Navbar"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import '../index.css'
import ListingList from "../Components/Listings/ListingList"
export const HomePage = () => {
    // homepage for ecommerce website with logo as Triton2Shop
    const { theme } = useContext(AppContext);
    const mockListings = [
        { id: 1, title: 'Decor', price: 20, imageUrl: "https://images.pexels.com/photos/7486538/pexels-photo-7486538.jpeg/" },
        { id: 2, title: 'Mercedes-Benz', price: 10998, imageUrl: 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        { id: 3, title: 'Ipad Air', price: 250, imageUrl: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
        // Add more items as needed
    ];
    return (
        <div className={`container ${theme}`}>
            <Navbar />
            <ListingList listings={mockListings} />
        </div>
    )
}