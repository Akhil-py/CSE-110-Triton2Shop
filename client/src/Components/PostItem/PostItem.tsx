import React, { useState, useEffect } from 'react';
import { Condition, Category } from '../../types/types';
import { Dropdown } from '../Dropdown/dropdown';
import './PostItem.css';
import { postListing, fetchCurrentUserId } from '../../utils/listing-utils';

export const PostItem: React.FC = () => {
    //TODO: When Users table works after OAuth, make this the prop for signed in user
    const [curUserId, setCurUserId] = useState<number | string>('');
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState<number | string>('');
    const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [description, setDescription] = useState<string>('');
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [imagePath, setImagePath] = useState<string | null>(null);

    // // Fetch the current user's ID when the component mounts
    // useEffect(() => {
    //     const getUserId = async () => {
    //         const id = await fetchCurrentUserId();
    //         if (id !== null) {
    //             setCurUserId(id);
    //         } else {
    //             console.log('User is not authenticated.');
    //             // redirect to login or show a message
    //         }
    //     };
    //     getUserId();
    // }, []);


    // Handle image upload
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
                    setImagePath(data.filePaths[0]);  // uses first image as display on homepage
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

    // Handle form submission
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
       // setCurUserId(1); // Placeholder, set current user ID correctly
        const id = await fetchCurrentUserId();
        console.log('Current user ID:', id);
        if (id !== null) {
            setCurUserId(id);
        } else {
            console.log('User is not authenticated.');
            // redirect to login or show a message
        }

        if (!title || !price || !selectedCondition || !selectedCategory) {
            alert('Please fill in all required fields.');
            return;
        }

        // const formData = new FormData();

        // // Append form data (non-file fields)
        // formData.append('sellerId', "1"); // Placeholder, replace with dynamic user ID
        // formData.append('itemName', title);
        // formData.append('price', price.toString());
        // formData.append('category', selectedCategory);
        // formData.append('condition', selectedCondition);
        // formData.append('description', description || ''); // Optional, can be empty if not provided
        // formData.append('itemPicture', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s');

        const listingData = {
            sellerId: curUserId,  // Placeholder for the dynamic user ID
            itemName: title,
            price: price,
            category: selectedCategory,
            condition: selectedCondition,
            description: description || '', // Optional, can be empty
            itemPicture: imagePath
        };

        try {
            const result = await postListing(listingData);
            
            if (result.success) {
                alert('Item listed successfully!');
                console.log('Listing successfully posted:', result.data);
                // Reset form after successful submission
                setTitle('');
                setPrice('');
                setSelectedCondition(null);
                setSelectedCategory(null);
                setDescription('');
                setImages([]);
                setImagePreviews([]);
            } else {
                throw new Error(result.message); // Error handling based on the message in the result
            }
        } catch (error) {
            console.error('Error submitting listing:', error);
            alert('There was an error submitting your listing.');
        }

    };

    return (
        <div className="posting-page">
            <form onSubmit={handleSubmit}>
                <div className="information-fields">
                    <h2>Item for Sale</h2>
                    <input
                        placeholder="Add Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Add Price"
                        type="number"
                        value={price}
                        onChange={(e) => {
                            const value = e.target.value;
                            // regex to allow only numbers with up to two decimal places
                            const regex = /^\d*(\.\d{0,2})?$/;
                            if (regex.test(value)) {
                                setPrice(value);  
                            }
                        }}
                    />
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
                    <Dropdown
                        label="Condition"
                        items={Object.values(Condition)}
                        selectedItem={selectedCondition}
                        onSelect={(condition: Condition) => setSelectedCondition(condition)}
                    />
                    <input
                        placeholder="Add Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Dropdown
                        label="Category"
                        items={Object.values(Category)}
                        selectedItem={selectedCategory}
                        onSelect={(category: Category) => setSelectedCategory(category)}
                    />
                    <input placeholder="Location" />
                    <div className="submission-buttons">
                        <button type="button">Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </form>

            <div className="live-preview">
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
