import { Database } from "sqlite";
import { Request, Response } from "express";

export async function createRequestServer(req: Request, res: Response, db: Database) {
    try {
        const { item, buyer } = req.body as {
            item: number,
            buyer: number
        };

        // Check for missing fields
        const missingFields = [];
        if (!item) missingFields.push("item");
        if (!buyer) missingFields.push("buyer");

        if (missingFields.length > 0) {
            return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // Set the status to 'Pending' by default
        const status = 'Pending';
        const dismissed=0;

        // Insert the new request
        await db.run(
            `INSERT INTO Requests (item, buyer, status, dismissed, dateRequested) 
             VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP);`,
            [item, buyer, status, dismissed]
        );

        res.status(201).send({ item, buyer, status, dismissed });
    } catch (error) {
        console.error("Error creating request:", error);
        return res.status(400).send({ error: `Request could not be created: ${error}` });
    }
}


export async function updateRequestStatus(req: Request, res: Response, db: Database) {
    try {
        const { requestId, status } = req.body as {
            requestId: number;
            status: "Pending" | "Approved" | "Rejected";
        };

        // Validate input fields
        const missingFields = [];
        if (!requestId) missingFields.push("requestId");
        if (!status) missingFields.push("status");

        if (missingFields.length > 0) {
            return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // Validate status
        const validStatuses = ["Pending", "Approved", "Rejected"];
        if (!validStatuses.includes(status)) {
            return res.status(400).send({ error: `Invalid status: ${status}. Valid statuses are 'Pending', 'Approved', or 'Rejected'.` });
        }

        // Check if the requestId exists
        const request = await db.get(
            `SELECT * FROM Requests WHERE id = ?`,
            [requestId]
        );

        if (!request) {
            return res.status(404).send({ error: `Request with ID ${requestId} not found.` });
        }

        // Update the status of the request
        await db.run(
            `UPDATE Requests SET status = ? WHERE id = ?`,
            [status, requestId]
        );

        res.status(200).send({ message: `Request status updated to '${status}'`, requestId, status });
    } catch (error) {
        console.error("Error updating request status:", error);
        return res.status(500).send({ error: `Unable to update request status: ${error}` });
    }

}

//TODO continue changing cus we no longer have "isActive" as a field
//makes request's dismissed=1 and either makes item's quantity less than 1 or if the current item's quantity is already 0, make it inactive in items table
export async function dismissRequest(req: Request, res: Response, db: Database) {
    try {
        const { requestId } = req.body as { requestId: number };

        // Check for missing fields
        if (!requestId) {
            return res.status(400).send({ error: "Missing required field: requestId" });
        }

        // Mark the request as dismissed
        const request = await db.get(`SELECT item FROM Requests WHERE id = ?`, [requestId]);
        if (!request) {
            return res.status(404).send({ error: `Request with ID ${requestId} not found.` });
        }

        const { item } = request;

        // Update the dismissed column for the request
        await db.run(`UPDATE Requests SET dismissed = 1 WHERE id = ?`, [requestId]);

        // Get the current quantity and isActive status of the item
        const itemData = await db.get(`SELECT quantity, isActive FROM Items WHERE id = ?`, [item]);
        if (!itemData) {
            return res.status(404).send({ error: `Item with ID ${item} not found.` });
        }

        let { quantity } = itemData;

        // Update the item based on the quantity logic
        if (quantity > 0) {
            quantity -= 1;
            const isActive = quantity > 0 ? 1 : 0;

            await db.run(
                `UPDATE Items SET quantity = ?, isActive = ? WHERE id = ?`,
                [quantity, isActive, item]
            );
        }

        // Return a success response
        res.status(200).send({
            message: `Request ${requestId} dismissed successfully.`,
            item: {
                id: item,
                updatedQuantity: quantity,
                isActive: quantity > 0 ? 1 : 0
            }
        });
    } catch (error) {
        console.error("Error dismissing request:", error);
        return res.status(500).send({ error: `An error occurred` });
    }
}
