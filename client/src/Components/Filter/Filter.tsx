// Filter.tsx
import { useContext, useState } from 'react';
import './Filter.css';
import { AppContext } from '../../context/AppContext';
const Filter: React.FC = () => {
    const { setPriceRange } = useContext(AppContext);
    const [min, setMin] = useState<number | string | undefined>();
    const [max, setMax] = useState<number | string | undefined>();

    const applyPriceFilter = () => {
        const minValue = min === '' || min === undefined ? 0 : parseFloat(String(min));
        const maxValue = max === '' || max === undefined ? Infinity : parseFloat(String(max));
        setPriceRange(minValue, maxValue);
    };
    return (
        <div className="filter-container">
            <h3>Filters</h3>
            <div className="filter-section">
                <h4>Price range</h4>
                <input
                    type="number"
                    placeholder="Min"
                    value={min !== undefined ? min : ''}
                    onChange={(e) => setMin(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Max"
                    value={max !== undefined ? max : ''}
                    onChange={(e) => setMax(e.target.value === '' ? '' : parseFloat(e.target.value))}
                />
                <button onClick={applyPriceFilter}>Go</button>
            </div>
            <div className="filter-section">
                <h4>Condition</h4>
                <label>
                    <input type="checkbox" /> New
                </label>
                <label>
                    <input type="checkbox" /> Open box
                </label>
                <label>
                    <input type="checkbox" /> Reconditioned
                </label>
                <label>
                    <input type="checkbox" /> Used
                </label>
            </div>
        </div>
    );
};

export default Filter;
