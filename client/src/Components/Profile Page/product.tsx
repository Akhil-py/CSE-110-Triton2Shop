import React from 'react';
import './product.css';
import { Navbar } from '../Navbar/Navbar';

const GEISELIMAGE = '/chicken.jpeg'

type ProfileProps = {
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    distance: number;
    sellerName: string;
    sellerUsername: string;
    sellerContact: string;
};

const ProfilePage: React.FC<ProfileProps> = ({
    title = 'Title',
    price = 69,
    imageUrl = 'beeswax',
    description = 'amogus',
    distance = 69,
    sellerName = 'John Smith',
    sellerUsername = 'TritonLowBaller',
    sellerContact = '123-456-7890'
}) => {
    const favouriteHandler = () => {
        console.log('Favourited!');
    };

    const buyHandler = () => {
        console.log('Bought!');
    };

    return (
        <div>
            <Navbar />
            <div className='product-page'>
                <div className='product-item'>
                    <div className='product-name'>
                        <h1>{title}</h1>
                    </div>
                    <div className='product-body'>
                        <div className='product-image'>
                            <img src={GEISELIMAGE} alt={title} />
                            <div className='desc'>
                                <div className='seller-info'>
                                    <div className='seller-details'>
                                            <p id='name'>Name: {sellerName}</p>
                                            <p id='username'>Username: {sellerUsername}</p>
                                            <p id='contact'>Contact Info: {sellerContact}</p>
                                    </div>
                                    <p id='distance'>Distance: {distance} miles</p>
                                </div>
                            </div>
                        </div>
                        <div className='product-info'>
                            <div className='product-buttons'>
                                <p>Items Sold: </p>
                                <p>Items Purchased: </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
