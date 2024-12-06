import { Database } from "sqlite";
import { Request, Response } from "express";

// Insert a new TODO record
export async function insertIntoTODO(req: Request, res: Response, db: Database) {
    try {
        const { sellerId, purchaserId, itemName } = req.body;

        // Validate the input
        if (!sellerId || !purchaserId || !itemName) {
            return res.status(400).send({ error: "sellerId, purchaserId, and itemName are required" });
        }

        // Insert the TODO record into the database
        const result = await db.run(
            `INSERT INTO TODO (sellerId, purchaserId, itemName) 
             VALUES (?, ?, ?)`,
            [sellerId, purchaserId, itemName]
        );

        // Check if the insertion was successful
        if (result.changes === 0) {
            return res.status(500).send({ error: "Failed to insert into TODO" });
        }

        res.status(201).send({ message: "TODO inserted successfully" });
    } catch (error) {
        console.error("Error inserting into TODO:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}

// Retrieve TODO records where the user is either a seller or a purchaser
export async function fetchTODOByUserId(req: Request, res: Response, db: Database) {
    try {
        const userId = parseInt(req.params.userId, 10);

        // Validate the userId
        if (isNaN(userId)) {
            return res.status(400).send({ error: "Invalid user ID" });
        }

        // Fetch the TODO records where the user is either the seller or purchaser
        const todos = await db.all(
            `SELECT t.id, t.sellerId, t.purchaserId, t.itemName
             FROM TODO t
             WHERE t.sellerId = ? OR t.purchaserId = ?`,
            [userId, userId]
        );

        // Check if any TODO records exist
        if (!todos || todos.length === 0) {
            return res.status(404).send({ message: "No TODO records found for this user" });
        }

        res.status(200).send(todos);
    } catch (error) {
        console.error("Error fetching TODO records by user:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}

// Delete a TODO record by its ID
export async function deleteTODOById(req: Request, res: Response, db: Database) {
    try {
        const todoId = parseInt(req.params.todoId, 10);

        // Validate the todoId
        if (isNaN(todoId)) {
            return res.status(400).send({ error: "Invalid TODO ID" });
        }

        // Delete the TODO record from the database
        const result = await db.run(
            `DELETE FROM TODO WHERE id = ?`,
            [todoId]
        );

        // Check if the deletion was successful
        if (result.changes === 0) {
            return res.status(404).send({ message: "TODO not found" });
        }

        res.status(200).send({ message: "TODO deleted successfully" });
    } catch (error) {
        console.error("Error deleting TODO by ID:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
}
