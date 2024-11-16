import React from 'react';
import { render, screen, fireEvent, getByTestId, getAllByTestId } from "@testing-library/react";
import App from './App';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';

describe('Favorites List',()=>{
    test('renders the Favorite list in /favorites',()=>{
    render(
        <MemoryRouter initialEntries={['/favorites']}>
          <App />
        </MemoryRouter>
    );
    const title=screen.getByText('Favorites')
    expect(title).toBeInTheDocument();
    });
});

