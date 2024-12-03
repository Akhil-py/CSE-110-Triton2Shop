import { MarketplaceListing, Category, Condition } from "../types/types";

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