import { render, screen } from '@testing-library/react';
import MarketplaceListingList from '../Components/Marketplace/MarketplaceListingList';
import { AppContext } from '../context/AppContext';
import { Category, Condition, AppContextType } from '../types/types';
import { MemoryRouter } from 'react-router-dom';

const mockListings = [
    { id: 1, itemName: "Sample Item 1", price: 50, itemPicture: "/sample1.jpg", category: Category.Electronics, condition: Condition.Good },
    { id: 2, itemName: "Sample Item 2", price: 150, itemPicture: "/sample2.jpg", category: Category.ClothingAccessories, condition: Condition.LikeNew },
];

const renderWithProvider = (category: Category, minPrice: number, maxPrice: number, conditions: Condition[], searchQuery: string) => {
    return render(
        <MemoryRouter>
            <AppContext.Provider
                value={{
                    category: category,
                    setCategory: jest.fn(),
                    minPrice: minPrice,
                    maxPrice: maxPrice,
                    setPriceRange: jest.fn(),
                    conditions: conditions,
                    setConditions: jest.fn(),
                    searchQuery: searchQuery,
                    setSearchQuery: jest.fn(),
                    isLoggedIn: false,
                    setIsLoggedIn: jest.fn(),
                }}
            >
                <MarketplaceListingList MarketplaceListings={mockListings} />
            </AppContext.Provider>
        </MemoryRouter>
    );
};

describe('Marketplace Listing List', () => {
    it('filters listings based on category', () => {
        renderWithProvider(Category.Electronics, 0, Infinity, [], '');
        expect(screen.getByText('Sample Item 1')).toBeInTheDocument();
        expect(screen.queryByText('Sample Item 2')).not.toBeInTheDocument();
    });
    it('filters listings based on price range', () => {
        renderWithProvider(Category.All, 100, 200, [], '');
        expect(screen.queryByText('Sample Item 1')).not.toBeInTheDocument();
        expect(screen.getByText('Sample Item 2')).toBeInTheDocument();
    })
    it('filter listings based on condition', () => {
        renderWithProvider(Category.All, 0, Infinity, [Condition.LikeNew], '');
        expect(screen.getByText('Sample Item 2')).toBeInTheDocument();
        expect(screen.queryByText('Sample Item 1')).not.toBeInTheDocument();
    })
    it('filters listings based on search query', () => {
        renderWithProvider(Category.All, 0, Infinity, [], '2');
        expect(screen.queryByText('Sample Item 1')).not.toBeInTheDocument();
        expect(screen.getByText('Sample Item 2')).toBeInTheDocument();
    })
    it('renders all listings when no filters are applied', () => {
        renderWithProvider(Category.All, 0, Infinity, [], '');
        expect(screen.getByText('Sample Item 1')).toBeInTheDocument();
        expect(screen.getByText('Sample Item 2')).toBeInTheDocument();
    })
    it('renders no listing when there are no matching listings', () => {
        renderWithProvider(Category.All, 200, 300, [], '');
        expect(screen.queryByText('Sample Item 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Sample Item 2')).not.toBeInTheDocument();
    })
    it('render listings with multiple conditions', () => {
        renderWithProvider(Category.All, 0, Infinity, [Condition.LikeNew, Condition.Good], '');
        expect(screen.getByText('Sample Item 2')).toBeInTheDocument();
        expect(screen.getByText('Sample Item 1')).toBeInTheDocument();
    })
});
