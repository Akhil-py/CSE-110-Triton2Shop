import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../Components/Filter/Filter';
import { AppContext } from '../context/AppContext';
import { Category, Condition } from '../types/types';

// Mocking the AppContext
const mockSetPriceRange = jest.fn();
const mockSetConditions = jest.fn();

const renderFilter = (contextValues = {}) => {
    return render(
        <AppContext.Provider
            value={{
                setPriceRange: mockSetPriceRange,
                conditions: [],
                setConditions: mockSetConditions,
                category: Category.All,
                setCategory: jest.fn(),
                minPrice: 0,
                maxPrice: Infinity,
                searchQuery: '',
                setSearchQuery: jest.fn(),
                isLoggedIn: false,
                setIsLoggedIn: jest.fn(),

            }}
        >
            <Filter />
        </AppContext.Provider>
    );
};
describe('Filter Island', () => {
    beforeEach(() => {
        mockSetPriceRange.mockClear();
        mockSetConditions.mockClear();
    });

    it('renders correctly', () => {
        renderFilter();
        expect(screen.getByText('Filters')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Min')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Max')).toBeInTheDocument();
        expect(screen.getByText('Go')).toBeInTheDocument();
        Object.values(Condition).forEach(condition => {
            expect(screen.getByLabelText(condition)).toBeInTheDocument();
        });
    });
    it('updates min and max input values correctly', () => {
        renderFilter();

        const minInput = screen.getByPlaceholderText('Min') as HTMLInputElement;
        const maxInput = screen.getByPlaceholderText('Max') as HTMLInputElement;

        fireEvent.change(minInput, { target: { value: '10' } });
        expect(minInput.value).toBe('10');

        fireEvent.change(maxInput, { target: { value: '100' } });
        expect(maxInput.value).toBe('100');
    });
    it('applies price filter with correct values when Go button is clicked', () => {
        renderFilter();

        const minInput = screen.getByPlaceholderText('Min');
        const maxInput = screen.getByPlaceholderText('Max');
        const goButton = screen.getByText('Go');

        fireEvent.change(minInput, { target: { value: '10' } });
        fireEvent.change(maxInput, { target: { value: '100' } });
        fireEvent.click(goButton);

        expect(mockSetPriceRange).toHaveBeenCalledWith(10, 100);
    });
    it('applies default values when min and max are empty or undefined', () => {
        renderFilter();

        const goButton = screen.getByText('Go');
        fireEvent.click(goButton);

        expect(mockSetPriceRange).toHaveBeenCalledWith(0, Infinity);
    });
    it('toggles condition filters correctly', () => {
        renderFilter({
            conditions: [],
        });

        const likeNewCheckbox = screen.getByLabelText(Condition.LikeNew);

        fireEvent.click(likeNewCheckbox);
        expect(mockSetConditions).toHaveBeenCalledWith([Condition.LikeNew]);
    });
    it('handles non-numeric or boundary values in min and max inputs', () => {
        renderFilter();

        const minInput = screen.getByPlaceholderText('Min');
        const maxInput = screen.getByPlaceholderText('Max');
        const goButton = screen.getByText('Go');

        fireEvent.change(minInput, { target: { value: '-10' } });
        fireEvent.change(maxInput, { target: { value: 'notANumber' } });
        fireEvent.click(goButton);

        expect(mockSetPriceRange).toHaveBeenCalledWith(0, Infinity);
    });
});