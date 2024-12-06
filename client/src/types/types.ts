export enum Category {
    All = "All",
    Electronics = "Electronics & Media",
    HomeGarden = "Home & Garden",
    ClothingAccessories = "Clothing, Shoes, & Accessories",
    Vehicles = "Vehicles",
    ToysGames = "Toys, Games, & Hobbies",
    SportsOutdoors = "Sports & Outdoors",
}

export enum Condition {
    LikeNew = "Like New",
    VeryGood = "Very Good",
    Good = "Good",
    Acceptable = "Acceptable",
    Fair = "Fair",
    Poor = "Poor",
}

export type MarketplaceListing = {
    id: number;
    price: number;
    category: Category;
    condition: Condition;
    itemName: string;
    itemPicture: string;
};

export interface MarketplaceListingWithSeller {
    id: number;
    itemName: string;
    price: number;
    itemPicture: string;
    category: Category;
    condition: Condition;
    description: string;
    datePosted: string;
    quantity: number;
    sellerName: string;
    sellerEmail: string;
}

export interface AppContextType {
    category: Category;
    setCategory: (category: Category) => void;
    minPrice: number;
    maxPrice: number;
    setPriceRange: (min: number, max: number) => void;
    conditions: Condition[];
    setConditions: (condition: Condition[]) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const mockListings = [
    { id: 1, itemName: 'Glass Vase', price: 20, itemPicture: "https://images.pexels.com/photos/7486538/pexels-photo-7486538.jpeg/", category: Category.HomeGarden, condition: Condition.LikeNew },
    { id: 2, itemName: 'Mercedes-Benz', price: 10998, itemPicture: 'https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: Category.Vehicles, condition: Condition.LikeNew },
    { id: 3, itemName: 'Ipad Air 2015 5th Generation', price: 250, itemPicture: 'https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', category: Category.Electronics, condition: Condition.LikeNew },

    // Add more items as needed
];