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
    userId: number;
    title: string;
    price: number;
    imageUrl: string;
    category: Category;
    condition: Condition;
};

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
    MarketplaceListings: MarketplaceListing[];
    setMarketplaceListings: React.Dispatch<React.SetStateAction<MarketplaceListing[]>>;
}