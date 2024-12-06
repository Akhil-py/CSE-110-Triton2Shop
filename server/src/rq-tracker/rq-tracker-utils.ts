import { Database } from "sqlite";
import { Request, Response } from "express";

//show all requests curr user sent
export async function fetchRequestsSentByUserServer(req: Request, res: Response, db: Database) {
    try {
        const userId = parseInt(req.params.userId, 10);

        // Validate the userId
        if (isNaN(userId)) {
            return res.status(400).send({ error: "Invalid user ID" });
        }

        // Fetch the requests
        const requests = await db.all(
            `SELECT r.id, r.item, r.dateRequested, r.status, r.dismissed, 
                    i.sellerId, i.itemName, i.itemPicture, i.price, i.condition, i.category
             FROM Requests r
             JOIN Items i ON r.item = i.id
             WHERE r.buyer = ?`,
            [userId]
        );

        // Check if any requests exist
        if (!requests || requests.length === 0) {
            return res.status(404).send({ message: "No requests found for this user" });
        }

        res.status(200).send(requests);
    } catch (error) {
        console.error("Error fetching requests sent by user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}


//show all requests for items u are selling
export async function fetchRequestsForSellerServer(req: Request, res: Response, db: Database) {
    try {
        const userId = parseInt(req.params.userId, 10);

        // Validate the userId
        if (isNaN(userId)) {
            return res.status(400).send({ error: "Invalid user ID" });
        }

        // Fetch the requests
        const requests = await db.all(
            `SELECT r.id, r.buyer, r.dateRequested, r.status, r.dismissed, 
                    u.name AS buyerName, u.email AS buyerEmail, u.profilePicture AS buyerProfilePicture, 
                    i.id AS itemId, i.itemName, i.itemPicture, i.price, i.condition, i.category
             FROM Requests r
             JOIN Items i ON r.item = i.id
             JOIN Users u ON r.buyer = u.id
             WHERE i.sellerId = ?`,
            [userId]
        );

        // Check if any requests exist
        if (!requests || requests.length === 0) {
            return res.status(404).send({ message: "No requests found for items being sold by this user" });
        }

        res.status(200).send(requests);
    } catch (error) {
        console.error("Error fetching requests for items sold by user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}

//delete request by the requestId
export const deleteRequestById = async (requestId: number, db: Database): Promise<boolean> => {
    try {
        // Delete the request with the specified ID
        const result = await db.run('DELETE FROM Requests WHERE id = ?', [requestId]);

        // Check if any rows were deleted (if result.changes is 0, no rows were deleted)
        if (result.changes === 0) {
            console.log(`Request with ID ${requestId} not found`);
            return false;  
        }

        console.log(`Request with ID ${requestId} successfully deleted`);
        return true;  
    } catch (error) {
        console.error(`Error deleting request with ID ${requestId}:`, error);
        return false;  
    }
};
