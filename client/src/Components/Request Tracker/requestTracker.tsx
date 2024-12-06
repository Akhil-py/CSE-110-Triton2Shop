// import React from 'react';
// import './requestTracker.css';
// import { Navbar } from '../Navbar/Navbar';
// import { fetchCurrentUserId } from '../../utils/listing-utils';

// type SellItem = {
//     itemName: string;
//     buyerName: string;
// };

// type BuyItem = {
//     itemName: string;
// };

// const itemsForSale: BuyItem[] = [
//     { itemName: "Laptop" },
//     { itemName: "Phone" },
//     { itemName: "Headphones" }
// ];

// const soldItems: SellItem[] = [
//     { itemName: "Tablet", buyerName: "Alice" },
//     { itemName: "Camera", buyerName: "Bob" }
// ];

// const RequestTracker: React.FC = () => {
//     const itemHandler = async () => {
//         const id = await fetchCurrentUserId();
//         console.log('Current user ID:', id);
//         console.log('item');
//     }

//     const acceptHandler = () => {
//         console.log('accept');
//     }

//     const rejectHandler = () => {
//         console.log('reject');
//     }

//     const viewSellerHandler = () => {
//         console.log('view seller');
//     }

//     const viewBuyerHandler = () => {
//         console.log('view buyer');
//     }

//     const cancelHandler = () => {
//         console.log('cancel');
//     }

//     return (
//         <div>
//             <Navbar />
//             <div className='request-tracker-page'>
//                 <div className='title'>
//                     <h1>Request Tracker</h1>
//                 </div>
                
//                 {/* Sent Requests for Buying */}
//                 <div className='sent-requests'>
//                     <h2>Sent Requests</h2>
//                     <h3>For Buying an Item</h3>
//                     {itemsForSale.map((item, index) => (
//                         <div className='sent-request' key={index}>
//                             <p className='received-panels' onClick={itemHandler}>{item.itemName}</p>
//                             <button className='view-button' onClick={viewSellerHandler}>View Seller</button>
//                             <button className='cancel-button' onClick={cancelHandler}>X</button>
//                         </div>
//                     ))}
//                 </div>
                
//                 {/* Received Requests for Selling */}
//                 <div className='received-requests'>
//                     <h2>Received Requests</h2>
//                     <h3>For Selling an Item</h3>
//                     {soldItems.map((item, index) => (
//                         <div className='received-request' key={index}>
//                             <div className='received-panels' onClick={viewBuyerHandler}>
//                                 <p>{item.buyerName}</p>
//                             </div>
//                             <p>wants to buy</p>
//                             <div className='received-panels' onClick={itemHandler}>
//                                 <p>{item.itemName}</p>
//                             </div>
//                             <div className='buttons'>
//                                 <button className='accept-button' onClick={acceptHandler}>✔</button>
//                                 <button className='reject-button' onClick={rejectHandler}>X</button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default RequestTracker;


import React, { useState, useEffect } from 'react';
import './requestTracker.css';
import { Navbar } from '../Navbar/Navbar';
import { fetchCurrentUserId, fetchRequestsSent, fetchRequestsReceived, deleteRequest, createTodo, deleteItem, fetchUser } from '../../utils/listing-utils'; // import the API functions

type SellItem = {
    itemName: string;
    buyer: number;
    buyerName: string;
    sellerId: number;
    id: number; // Add ID field for the transaction
    itemId: number;
};

type BuyItem = {
    item: number;
    itemName: string;
    sellerId: number;
    id: number; // Add ID field for the item
};


const RequestTracker: React.FC = () => {
    const [sentRequests, setSentRequests] = useState<BuyItem[]>([]); // Holds sent buy requests
    const [receivedRequests, setReceivedRequests] = useState<SellItem[]>([]); // Holds received sell requests

    // Fetch current user ID and requests on component mount
    useEffect(() => {
        const fetchData = async () => {
            const userId = await fetchCurrentUserId(); // Get the current user ID

            if (userId) {
                const sent = await fetchRequestsSent(userId); // Get the sent requests
                const received = await fetchRequestsReceived(userId); // Get the received requests

                if (sent.success) {
                    setSentRequests(sent.data);
                }

                if (received.success) {
                    setReceivedRequests(received.data);
                }
            }
        };

        fetchData();
    }, []); // Run only once on component mount

    // Handlers
    const itemHandler = (itemId: number) => {
        // Redirect to the product page for the item
        window.location.href = `http://localhost:3000/product/${itemId}`;
    }

    // const acceptHandler = (transactionId: number) => {
    //     console.log('Accepted Transaction ID:', transactionId);
    //     // Add logic to accept the transaction
    // }
    const acceptHandler = async (transactionId: number, purchaserId: number, itemName: string, itemId: number) => {
        try {
            //console.log('Accepted Transaction ID:', transactionId);
            const sellerId = await fetchCurrentUserId();
            if (sellerId){
                console.log("sellerId is "+ sellerId);
                console.log("purchaserId is "+ purchaserId);
                console.log("itemName is "+ itemName);
                // Call createTodo to record the transaction in the TODO table
                await createTodo(sellerId, purchaserId, itemName);
                //get seller email and name from seller ID & get purchaser email and name from purchaser ID
                let sellerName;
                let sellerEmail;
                fetchUser(sellerId)
                    .then(user => {
                        console.log("Fetched user:", user);
                        console.log("seller name is "+ user.user.name);
                        sellerName= user.user.name;
                        console.log("seller email is "+ user.user.email);
                        sellerEmail=user.user.email;
                    })
                    .catch(error => {
                        console.error("Error fetching user:", error);
                    });
                    
                let purchaserName;
                let purchaserEmail;
                fetchUser(purchaserId)
                    .then(user => {
                        console.log("Fetched user:", user);
                        console.log("purchaser name is "+ user.user.name);
                        purchaserName=user.user.name;
                        console.log("purchaser email is "+ user.user.email);
                        purchaserEmail=user.user.email;
                    })
                    .catch(error => {
                        console.error("Error fetching user:", error);
                    });
                //TODO: parse through the data and save into variables then display it 

                // Call deleteItem to remove the item from the database and cascade delete all references of it
                await deleteItem(itemId);
                setReceivedRequests(receivedRequests.filter(request => request.id !== transactionId));
                
                //Show alert with transaction details
                //TODO: instead of sending out an alert, send out an email to both the purchaserEmail and sellerEmail (from above) letting them know that they should contact each other
                alert(
                    `"${itemName}" has been bought by "${purchaserName}". Please contact them at their email: "${purchaserEmail}" to arrange the details for the transaction (ie payment, time, location, etc). "${itemName}" and all its corresponding information has also been deleted and will not be displayed any longer.`
                );
            }
            
        } catch (error) {
            console.error("Error during transaction:", error);
            alert("There was an error processing the transaction. Please try again.");
        }
    };

    const rejectHandler = async (transactionId: number) => {
        console.log('Rejected Transaction ID:', transactionId);

        // Call deleteRequest to delete the request after rejection
        const response = await deleteRequest(transactionId);

        if (response.success) {
            // Remove the rejected item from the UI
            setReceivedRequests(receivedRequests.filter(request => request.id !== transactionId));
            console.log('Request rejected and deleted successfully');
        } else {
            console.error(response.message);
        }
    }

    const viewSellerHandler = (sellerId: number) => {
        console.log('Viewing Seller ID:', sellerId);
        // Here you can navigate to the seller's profile or perform other actions
    }

    const viewBuyerHandler = (buyerId: number) => {
        console.log('Viewing Buyer ID:', buyerId);
        // Here you can navigate to the buyer's profile or perform other actions
    }

    const cancelHandler = async (transactionId: number) => {
        console.log('Cancelled Transaction ID:', transactionId);

        // Call deleteRequest to delete the request after cancellation
        const response = await deleteRequest(transactionId);

        if (response.success) {
            // Remove the canceled item from the UI
            setSentRequests(sentRequests.filter(request => request.id !== transactionId));
            console.log('Request canceled and deleted successfully');
        } else {
            console.error(response.message);
        }
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
                    {sentRequests.map((item) => (
                        <div className={`sent-request transaction`} key={item.id}>
                            <p className='received-panels' onClick={() => itemHandler(item.item)}>{item.itemName}</p>
                            <button className='view-button' onClick={() => viewSellerHandler(item.sellerId)}>View Seller</button>
                            <button className='cancel-button' onClick={() => cancelHandler(item.id)}>X</button>
                        </div>
                    ))}
                </div>

                {/* Received Requests for Selling */}
                <div className='received-requests'>
                    <h2>Received Requests</h2>
                    <h3>For Selling an Item</h3>
                    {receivedRequests.map((item) => (
                        <div className={`received-request transaction`} key={item.id}>
                            <div className='received-panels' onClick={() => viewBuyerHandler(item.sellerId)}>
                                <p>{item.buyerName}</p>
                            </div>
                            <p>wants to buy your item:</p>
                            <div className='received-panels' onClick={() => itemHandler(item.itemId)}>
                                <p>{item.itemName}</p>
                            </div>
                            <div className='buttons'>
                                <button
                                    className='accept-button'
                                    onClick={() => acceptHandler(
                                        item.id,               // transactionId
                                        //sellerId is currUser userId,          // sellerId
                                        item.buyer,           // purchaserId
                                        item.itemName,          // itemName
                                        //item.sellerName,        // sellerName
                                        //item.sellerEmail,       // sellerEmail
                                        item.itemId             // itemId (from the item in receivedRequests)
                                    )}
                                >
                                    ✔
                                </button>
                                <button className='reject-button' onClick={() => rejectHandler(item.id)}>X</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RequestTracker;
