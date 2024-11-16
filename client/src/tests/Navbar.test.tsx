import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from '../Components/Navbar/Navbar';
import { AppProvider } from '../context/AppContext'; // Import your context provider
import { BrowserRouter } from 'react-router-dom';
const renderNavbar = () => {
    return render(
        <AppProvider>
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        </AppProvider>
    );
};
describe('Navigation Bar', () => {
    it('Renders correctly', () => {
        renderNavbar();
        const logo = screen.getByAltText('UCSD Triton logo');
        const searchInput = screen.getByPlaceholderText('Search');
        const searchIcon = screen.getByAltText('Search Icon');
        const logInLink = screen.getByText('Log in');
        const categoryLinks = screen.getAllByText(/All|Electronics|Clothing|Home|Vehicles|Toys|Sports/i);
        expect(categoryLinks).toHaveLength(7);
        expect(logInLink).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();
        expect(searchIcon).toBeInTheDocument();
        expect(logo).toBeInTheDocument();
    });
    it('Updates category when a category link is clicked', () => {
        renderNavbar();
        const categories = screen.getAllByText(/All|Electronics|Clothing|Home|Vehicles|Toys|Sports/i);

        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];

            fireEvent.click(category);

            categories.forEach((category, index) => {
                if (index === i) {
                    expect(category).toHaveClass('active');
                } else {
                    expect(category).not.toHaveClass('active');
                }
            });
        }
    });
    it('Updates search query when typing in the search box', () => {
        const { getByPlaceholderText } = renderNavbar();
        const searchInput = getByPlaceholderText('Search') as HTMLInputElement;
        fireEvent.change(searchInput, { target: { value: 'test query' } });
        expect(searchInput.value).toBe('test query');
    });
    it('Navigates to the home route when clicking the logo', () => {
        renderNavbar();
        const logo = screen.getByAltText('UCSD Triton logo');
        fireEvent.click(logo);
        expect(window.location.pathname).toBe('/');
    });
    it('Navigates to the login route when clicking the log in link', () => {
        renderNavbar();
        const logInLink = screen.getByText('Log in');
        fireEvent.click(logInLink);
        expect(window.location.pathname).toBe('/login');
    });
});