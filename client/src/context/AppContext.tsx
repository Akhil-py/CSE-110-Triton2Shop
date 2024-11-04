import { createContext, useState, useEffect } from "react";

interface AppContextType {
    theme: string;
    setTheme: (theme: string) => void;
}

const initialState: AppContextType = {
    theme: "light",
    setTheme: () => { },
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
    const [theme, setTheme] = useState<string>(localStorage.getItem('current_theme') || initialState.theme);
    useEffect(() => {
        localStorage.setItem('current_theme', theme);
    }, [theme]);
    return (
        <AppContext.Provider
            value={{
                theme: theme,
                setTheme: setTheme
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
