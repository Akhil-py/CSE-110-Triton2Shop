import { createContext, useState, useEffect } from "react";
import { Category } from "../types/types";
interface AppContextType {
    theme: string;
    setTheme: (theme: string) => void;
    category: Category;
    setCategory: (category: Category) => void;
}

const initialState: AppContextType = {
    theme: "light",
    setTheme: () => { },
    category: Category.All,
    setCategory: () => { },
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem('current_theme') || initialState.theme);
    const [category, setCategory] = useState<Category>(Category.All);
    useEffect(() => {
        localStorage.setItem('current_theme', theme);
    }, [theme]);
    return (
        <AppContext.Provider
            value={{
                theme: theme,
                setTheme: setTheme,
                category: category,
                setCategory: setCategory,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
