import React, { useState, useContext } from 'react';
import { MarketplaceListing, Condition, Category } from '../../types/types'
import { Dropdown } from '../Dropdown/dropdown';
import './PostItem.css';
import { AppContext } from "../../context/AppContext";
import { createListing } from "../../utils/listing-utils";

export const PostItem = () => {
    // app context consume
    const { MarketplaceListings, setMarketplaceListings } = useContext(AppContext);
    // state variables
    const [isConditionDropdownOpen, setIsConditionDropdownOpen] = useState(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [condition, setSelectedCondition] = useState<Condition>(Condition.VeryGood);
    const [category, setSelectedCategory] = useState<Category>(Category.All);
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [title, setTitle] = useState<string>("");
    const [userId, setuserID] = useState<number>(-1);
    const [price, setPrice] = useState<number>(0);
    const [imageUrl, setImageUrl] = useState<string>("");
    //const [category, setCategory] = useState<Category>(Category.All);
    //const [condition, setCondition] = useState<Condition>(Condition.VeryGood);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        const newListing: Omit<MarketplaceListing, 'id'> = {
            userId,
            title,
            price,
            imageUrl,
            category,
            condition,
        };
    
        const createdListing = await createListing(newListing);
        setMarketplaceListings([...MarketplaceListings, createdListing]);
    }

    const toggleConditionDropdown = (event: React.MouseEvent) => {
        event.preventDefault();
        setIsConditionDropdownOpen(!isConditionDropdownOpen);
    };

    const toggleCategoryDropdown = (event: React.MouseEvent) => {
        event.preventDefault();
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
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

            //backend data for uploading images
            const formData = new FormData();
            Array.from(files).forEach((file) => {
                formData.append('images', file); 
            });
    
            try {
                const response = await fetch('http://localhost:5000/upload', {
                    method: 'POST',
                    body: formData,
                });
    
                const data = await response.json();
                console.log('Uploaded file paths:', data.filePaths);
                if (data.filePaths.length > 0) {
                    setImageUrl(data.filePaths[0]);  // uses first image as display on homepage
                }
            } catch (error) {
                console.error('Error uploading files:', error);
            }
            
        }
    };

    const deleteImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className='posting-page'>
            <form onSubmit={onSubmit}>
            <div className='information-fields'>
                <h2>Item for Sale</h2>
                <input placeholder='Add Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <input placeholder='Add Price' value={price} onChange={(e) => setPrice(Number(e.target.value))} />

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
                    <label htmlFor="condition">Condition</label>
                    <button
                        className="dropdown-toggle"
                        onClick={toggleConditionDropdown}
                    >
                        {condition}
                    </button>
                    {isConditionDropdownOpen && (
                        <div className="dropdown-menu">
                        <select
                            id="condition"
                            className="hidden-select"
                            value={condition}
                            onChange={(e) => selectCondition((e.target as HTMLSelectElement).value as Condition)}
                        >
                            {Object.values(Condition).map((condition, index) => (
                            <option key={index} value={condition}>
                                {condition}
                            </option>
                            ))}
                        </select>
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
                    <label htmlFor="category">Category</label>
                    <button
                        className="dropdown-toggle"
                        onClick={toggleCategoryDropdown}
                    >
                        {category}
                    </button>
                    {isCategoryDropdownOpen && (
                        <div className="dropdown-menu">
                        <select
                            id="category"
                            className="hidden-select"
                            value={category}
                            onChange={(e) => selectCategory((e.target as HTMLSelectElement).value as Category)}
                        >
                            {Object.values(Category).map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                            ))}
                        </select>
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
                    <button type ="submit">Submit</button>
                </div>
            </div>

        </form>

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
};
