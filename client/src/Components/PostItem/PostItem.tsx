import { useState } from 'react';
import { Condition, Category } from '../../types/types'
import './PostItem.css';

export const PostItem = () => {
    const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState("Condition");
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newImages = Array.from(files).slice(0, 10 - images.length);
            const newImagePreviews: string[] = [];

            newImages.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    newImagePreviews.push(reader.result as string);
                    if (newImagePreviews.length === newImages.length) {
                        setImagePreviews((prev) => [...prev, ...newImagePreviews]);
                    }
                };
                reader.readAsDataURL(file);
            });

            setImages((prev) => [...prev, ...newImages]);
        }
    };
    const deleteImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };
    return (
        <div className='posting-page'>
            <div className='information-fields'>
                <h2>Item for Sale</h2>
                <input placeholder='Add Title' />
                <input placeholder='Add Price' />
                <div className="image-upload">
                    <label htmlFor="file-upload" className="custom-file-input">
                        Add Photos (up to 10)
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                    />
                </div>
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
            <div className='live-preview'>
                {imagePreviews.length > 0 ? (
                    <div className="image-preview-gallery">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="image-preview-container">
                                <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="image-preview"
                                />
                                <button
                                    className="delete-button"
                                    onClick={() => deleteImage(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No images uploaded yet.</p>
                )}
            </div>
        </div>
    );
}
