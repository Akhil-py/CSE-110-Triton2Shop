import { createContext, useState } from "react";
import { Category, Condition, AppContextType, MarketplaceListing } from "../types/types";

const initialState: AppContextType = {
    category: Category.All,
    setCategory: () => { },
    conditions: [],
    setConditions: () => { },
    minPrice: 0,
    maxPrice: Infinity,
    setPriceRange: () => { },
    searchQuery: "",
    setSearchQuery: () => { },
    MarketplaceListings: [],
    setMarketplaceListings: () => { }
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [category, setCategory] = useState<Category>(Category.All);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
    const [conditions, setConditions] = useState<Condition[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const setPriceRange = (min: number, max: number) => {
        setMinPrice(min);
        setMaxPrice(max);
    };
    const [MarketplaceListings, setMarketplaceListings] = useState<MarketplaceListing[]>([]);
    return (
        <AppContext.Provider
            value={{
                category: category,
                setCategory: setCategory,
                minPrice: minPrice,
                maxPrice: maxPrice,
                setPriceRange: setPriceRange,
                conditions: conditions,
                setConditions: setConditions,
                searchQuery: searchQuery,
                setSearchQuery: setSearchQuery,
                MarketplaceListings: MarketplaceListings,
                setMarketplaceListings: setMarketplaceListings
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
