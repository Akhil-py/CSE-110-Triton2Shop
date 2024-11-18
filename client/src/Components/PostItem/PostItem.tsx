import { useState } from 'react';
import { Condition, Category } from '../../types/types'
import './PostItem.css';

export const PostItem = () => {
    const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState("Condition");
    const [selectedCategory, setSelectedCategory] = useState("Category");

    const toggleConditionDropdown = () => {
        setIsConditionDropdownOpen(!isConditionDropdownOpen);
    };

    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
    };

    const selectCondition = (condition: Condition) => {
        setSelectedCondition(condition);
        setIsConditionDropdownOpen(false);
    };

    const selectCategory = (category: Category) => {
        setSelectedCategory(category);
        setIsCategoryDropdownOpen(false);
    };
    return (
        <div className='posting-page'>
            <div className='information-fields'>
                <h2>Item for Sale</h2>
                <input placeholder='Add Title' />
                <input placeholder='Add Price' />
                <input placeholder='Add Photo' />
                <div className="condition-dropdown">
                    <button onClick={toggleConditionDropdown} className="dropdown-toggle">
                        {selectedCondition}
                    </button>
                    {isConditionDropdownOpen && (
                        <div className="dropdown-menu">
                            {Object.values(Condition).map((condition, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectCondition(condition)}
                                    className="dropdown-item"
                                >
                                    {condition}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <input placeholder='Add Description' />
                <div className="category-dropdown">
                    <button onClick={toggleCategoryDropdown} className="dropdown-toggle">
                        {selectedCategory}
                    </button>
                    {isCategoryDropdownOpen && (
                        <div className="dropdown-menu">
                            {Object.values(Category).map((category, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectCategory(category)}
                                    className="dropdown-item"
                                >
                                    {category}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <input placeholder='Location' />
                <div className='submission-buttons'>
                    <button>Cancel</button>
                    <button>Submit</button>
                </div>
            </div>
            <div className='live-preview'>Live Preview of Listing</div>
        </div>
    );
}
