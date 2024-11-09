import { createContext, useState } from "react";
import { Category, Condition } from "../types/types";
interface AppContextType {
    category: Category;
    setCategory: (category: Category) => void;
    minPrice: number;
    maxPrice: number;
    setPriceRange: (min: number, max: number) => void;
    conditions: Condition[];
    setConditions: (condition: Condition[]) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const initialState: AppContextType = {
    category: Category.All,
    setCategory: () => { },
    conditions: [],
    setConditions: () => { },
    minPrice: 0,
    maxPrice: Infinity,
    setPriceRange: () => { },
    searchQuery: "",
    setSearchQuery: () => { }
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
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
