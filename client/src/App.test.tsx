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
    const title=screen.getAllByTestId('items')
    expect(title).toHaveLength(3);
    });

    test('deletes an item',()=>{
      render(
          <MemoryRouter initialEntries={['/favorites']}>
            <App />
          </MemoryRouter>
      );
      const title=screen.getAllByTestId('items');
      expect(title).toHaveLength(3);
      const exes=screen.getAllByTestId('x');
      fireEvent.click(exes[1]);
      const newItems=screen.getAllByTestId('items');
      expect(newItems).toHaveLength(2)
      });

});

