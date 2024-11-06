import { createContext, useState } from "react";
import { Category } from "../types/types";
interface AppContextType {
    category: Category;
    setCategory: (category: Category) => void;
    minPrice: number;
    maxPrice: number;
    setPriceRange: (min: number, max: number) => void;
}

const initialState: AppContextType = {
    category: Category.All,
    setCategory: () => { },
    minPrice: 0,
    maxPrice: Infinity,
    setPriceRange: () => { }
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [category, setCategory] = useState<Category>(Category.All);
    const [minPrice, setMinPrice] = useState<number>(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);
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
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
