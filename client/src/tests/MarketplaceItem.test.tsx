import { render, screen } from '@testing-library/react';
import MarketplaceItem from '../Components/Marketplace/MarketplaceItem';

it('renders MarketplaceItem with correct title, price, and image', () => {
    render(<MarketplaceItem itemName="Sample Item" price={20} itemPicture="/sample.jpg" id={0} />);

    expect(screen.getByText('Sample Item')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByAltText('Sample Item')).toHaveAttribute('src', '/sample.jpg');
});