import { MarketplaceListing, MarketplaceListingWithSeller, Category, Condition } from "../types/types";

const API_BASE_URL = "http://localhost:5000";

export const createListing = async (listing: Omit<MarketplaceListing, 'id'>): Promise<MarketplaceListing> => {
	const response = await fetch(`${API_BASE_URL}/listing`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(listing),
	});
	if (!response.ok) {
		throw new Error("Failed to create listing");
	}
	return response.json();
};

export const fetchListings = async (): Promise<MarketplaceListing[]> => {
	const response = await fetch(`${API_BASE_URL}/listing`);
	if (!response.ok) {
		throw new Error('Failed to fetch listing');
	}

	// Parsing the response to get the data
	let listingsList = response.json().then((jsonResponse) => {
		console.log("data in fetch fetchListings", jsonResponse);
		return jsonResponse.data;
	});

	console.log("response in fetch fetchListings", listingsList);
	return listingsList;
};


export const postListing = async (listingData: any) => {
    const response = await fetch(`${API_BASE_URL}/listing`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Indicating that the request body is JSON
        },
        body: JSON.stringify(listingData),
    });
    const result = await response.json();
    if (!response.ok) {
        return {
            success: false,
            message: result.error || 'Failed to post listing',
            data: result,
        };
	}
    return {
        success: true,
        message: 'Listing posted successfully',
        data: result,
    };
};

/**
 * Fetches the current authenticated user's ID.
 * @returns {Promise<number | null>} The user ID if authenticated, otherwise null.
 */
export const fetchCurrentUserId = async (): Promise<number | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/current-user`, {
            method: "GET",
            credentials: "include", // Include cookies for session authentication
        });

        if (!response.ok) {
            console.warn("Failed to fetch current user ID:", response.statusText);
            return null;
        }

        const data = await response.json();
		console.log("data in fetchCurrentUserId", data);
        return data.userId;
    } catch (error) {
        console.error("Error fetching current user ID:", error);
        return null;
    }
};

/**
 * Fetches a single item by ID along with seller details.
 * @param {number} id - The ID of the item to fetch.
 * @returns {Promise<MarketplaceListingWithSeller | null>} The item with seller details or null if not found.
 */
export const fetchItemWithSeller = async (id: number): Promise<MarketplaceListingWithSeller | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/listing/${id}`, {
            method: "GET",
            credentials: "include", // cookies for session authentication (might not be needed)
        });

        if (!response.ok) {
            console.warn("Failed to fetch item:", response.statusText);
            return null;
        }

        const data = await response.json();
        return data.item as MarketplaceListingWithSeller;
    } catch (error) {
        console.error("Error fetching item:", error);
        return null;
    }
};

// Fetch requests sent by the current user
export const fetchRequestsSent = async (userId: number): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/requests/sent/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch requests sent by the user');
        }

        const requestsSentData = await response.json();
        return {
            success: true,
            message: 'Requests sent by the user fetched successfully',
            data: requestsSentData,
        };
    } catch (error) {
        console.error("Error fetching requests sent by the user:", error);
        return {
            success: false,
            message: error || 'Failed to fetch requests sent by the user',
            data: null,
        };
    }
};

// Fetch requests for items the current user is selling
export const fetchRequestsReceived = async (userId: number): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/requests/received/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch requests for items the user is selling');
        }

        const requestsReceivedData = await response.json();
        return {
            success: true,
            message: 'Requests for items the user is selling fetched successfully',
            data: requestsReceivedData,
        };
    } catch (error) {
        console.error("Error fetching requests for items the user is selling:", error);
        return {
            success: false,
            message: error || 'Failed to fetch requests for items the user is selling',
            data: null,
        };
    }
};

// Delete a request by its ID
export const deleteRequest = async (requestId: number): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/requests/delete/${requestId}`, {
            method: 'DELETE',
        });

        const result = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: result.message || 'Failed to delete request',
            };
        }

        return {
            success: true,
            message: 'Request deleted successfully',
        };
    } catch (error) {
        console.error("Error deleting request:", error);
        return {
            success: false,
            message: error || 'Failed to delete request',
        };
    }
};

export const createTodo = async (sellerId: number, purchaserId: number, itemName: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/todo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerId, purchaserId, itemName }),
    });
    if (!response.ok) {
        throw new Error("Failed to create TODO");
    }
    return response.json();
};

export const fetchTodosByUser = async (userId: number): Promise<any[]> => {
    const response = await fetch(`${API_BASE_URL}/todos/${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch TODOs");
    }
    return response.json();
};

export const deleteTodo = async (todoId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/todo/${todoId}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete TODO");
    }
};

export const deleteItem = async (itemId: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        throw new Error("Failed to delete item");
    }
    return response.json();
};

export const fetchUser = async (userId: number): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/user/${userId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }
    return response.json();
};

export const sendPurchaseEmail = async (sellerName: any, sellerEmail: any, buyerName: any, buyerEmail: any) => {
    const response = await fetch(`${API_BASE_URL}/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ sellerName, sellerEmail, buyerName, buyerEmail }),
    });
    if (!response.ok) {
        throw new Error("Failed to send purchase email");
    }
};


export const createRequest = async (itemId: number, buyerId: number): Promise<{ item: number, buyer: number, status: string, dismissed: number }> => {
    const response = await fetch(`${API_BASE_URL}/makerequest`, {
method: "POST",
headers: {
    "Content-Type": "application/json",
},
body: JSON.stringify({ item: itemId, buyer: buyerId }),
});

if (!response.ok) {
    throw new Error("Failed to create request");
}

return response.json();  // Returning the response in the same shape as what the backend sends
};
