import { MarketplaceListing } from "../types/types";

const API_BASE_URL = "http://localhost:5001";

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
