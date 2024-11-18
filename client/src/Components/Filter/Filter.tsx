// Filter.tsx
import { useContext, useState } from 'react';
import './Filter.css';
import { AppContext } from '../../context/AppContext';
import { Condition } from '../../types/types';
const Filter: React.FC = () => {
    const { setPriceRange, conditions, setConditions } = useContext(AppContext);
    const [min, setMin] = useState<number | string | undefined>();
    const [max, setMax] = useState<number | string | undefined>();

    const applyPriceFilter = () => {
        const minValue = isNaN(Number(min)) || min === '' || min === undefined || Number(min) < 0 ? 0 : parseFloat(String(min));
        const maxValue = isNaN(Number(max)) || max === '' || max === undefined || Number(max) < 0 ? Infinity : parseFloat(String(max));
        setPriceRange(minValue, maxValue);
    };
    const toggleCondition = (condition: Condition) => {
        if (conditions.includes(condition)) {
            setConditions(conditions.filter((c) => c !== condition));
        } else {
            setConditions([...conditions, condition]);
        }
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
                {Object.values(Condition).map((condition) => (
                    <label key={condition}>
                        <input
                            type="checkbox"
                            checked={conditions.includes(condition)}
                            onChange={() => toggleCondition(condition)}
                        />{' '}
                        {condition}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Filter;
