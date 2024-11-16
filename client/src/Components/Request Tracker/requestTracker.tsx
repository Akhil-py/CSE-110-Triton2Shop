import React from 'react';
import './requestTracker.css';
import { Navbar } from '../Navbar/Navbar';

type SellItem = {
    itemName: string;
    buyerName: string;
};

type BuyItem = {
    itemName: string;
};

const itemsForSale: BuyItem[] = [
    { itemName: "Laptop" },
    { itemName: "Phone" },
    { itemName: "Headphones" }
];

const soldItems: SellItem[] = [
    { itemName: "Tablet", buyerName: "Alice" },
    { itemName: "Camera", buyerName: "Bob" }
];

const RequestTracker: React.FC = () => {
    const itemHandler = () => {
        console.log('item');
    }

    const acceptHandler = () => {
        console.log('accept');
    }

    const rejectHandler = () => {
        console.log('reject');
    }

    const viewSellerHandler = () => {
        console.log('view seller');
    }

    const viewBuyerHandler = () => {
        console.log('view buyer');
    }

    const cancelHandler = () => {
        console.log('cancel');
    }

    return (
        <div>
            <Navbar />
            <div className='request-tracker-page'>
                <div className='title'>
                    <h1>Request Tracker</h1>
                </div>
                
                {/* Sent Requests for Buying */}
                <div className='sent-requests'>
                    <h2>Sent Requests</h2>
                    <h3>For Buying an Item</h3>
                    {itemsForSale.map((item, index) => (
                        <div className='sent-request' key={index}>
                            <p className='received-panels' onClick={itemHandler}>{item.itemName}</p>
                            <button className='view-button' onClick={viewSellerHandler}>View Seller</button>
                            <button className='cancel-button' onClick={cancelHandler}>X</button>
                        </div>
                    ))}
                </div>
                
                {/* Received Requests for Selling */}
                <div className='received-requests'>
                    <h2>Received Requests</h2>
                    <h3>For Selling an Item</h3>
                    {soldItems.map((item, index) => (
                        <div className='received-request' key={index}>
                            <div className='received-panels' onClick={viewBuyerHandler}>
                                <p>{item.buyerName}</p>
                            </div>
                            <p>wants to buy</p>
                            <div className='received-panels' onClick={itemHandler}>
                                <p>{item.itemName}</p>
                            </div>
                            <div className='buttons'>
                                <button className='accept-button' onClick={acceptHandler}>✔</button>
                                <button className='reject-button' onClick={rejectHandler}>X</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RequestTracker;
