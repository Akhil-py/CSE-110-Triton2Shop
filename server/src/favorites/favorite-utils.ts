import { Database } from "sqlite";
import { Request, Response } from "express";

export async function getUserFavorites(req: Request, res: Response, db: Database) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).send({ error: "Missing required parameter: userId" });
        }

        // Query to get all favorite items for the user
        const query = `
            SELECT 
                Items.id AS itemId,
                Items.itemName,
                Items.itemPicture,
                Items.price,
                Items.description,
                Items.condition,
                Items.category,
                Items.datePosted,
                Items.quantity
            FROM 
                Favorites
            INNER JOIN 
                Items
            ON 
                Favorites.item = Items.id
            WHERE 
                Favorites.user = ?;
        `;

        // Execute the query
        const favorites = await db.all(query, [userId]);

        // Respond with the results
        res.status(200).send({ favorites });
    } catch (error) {
        console.error("Error fetching favorites:", error);
        return res.status(500).send({ error: `Could not fetch favorites: ${error}` });
    }
}

export async function addFavorite(req: Request, res: Response, db: Database) {
    try {
        const { userId, itemId } = req.body as { userId: number; itemId: number };

        // Validate input
        const missingFields = [];
        if (!userId) missingFields.push("userId");
        if (!itemId) missingFields.push("itemId");
        if (missingFields.length > 0) {
            return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // Insert into the Favorites table
        await db.run(
            `INSERT INTO Favorites (user, item, dateAdded) 
             VALUES (?, ?, CURRENT_TIMESTAMP);`,
            [userId, itemId]
        );

        res.status(201).send({ message: "Favorite added successfully", userId, itemId });
    } catch (error) {
        console.error("Error adding favorite:", error);
        res.status(500).send({ error: `Failed to add favorite` });
    }
}

export async function deleteFavorite(req: Request, res: Response, db: Database) {
    try {
        const { userId, itemId } = req.body as { userId: number; itemId: number };

        // Validate input
        const missingFields = [];
        if (!userId) missingFields.push("userId");
        if (!itemId) missingFields.push("itemId");
        if (missingFields.length > 0) {
            return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // Delete from the Favorites table
        const result = await db.run(
            `DELETE FROM Favorites 
             WHERE user = ? AND item = ?;`,
            [userId, itemId]
        );

        if (result.changes === 0) {
            return res.status(404).send({ error: "Favorite not found" });
        }

        res.status(200).send({ message: "Favorite removed successfully", userId, itemId });
    } catch (error) {
        console.error("Error deleting favorite:", error);
        res.status(500).send({ error: `Failed to delete favorite` });
    }
}


