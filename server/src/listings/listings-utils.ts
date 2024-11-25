import { MarketplaceListing, Category, Condition } from "../types";
import { Database } from "sqlite";
import { Request, Response } from "express";

export async function createListingServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { userId, title, price, imageUrl, category, condition} = req.body as 
                {  userId: number, title: string, price: number, imageUrl: string, category: Category, condition: Condition };
 /*
        if ( !id|| !title|| !price|| !imageURL|| !category || !condition) {
            return res.status(400).send({ error: "Missing required fields" });
        }
*/
        const missingFields = [];
        if (!userId) missingFields.push("userId");
        if (!title) missingFields.push("title");
        if (!price) missingFields.push("price");
        if (!imageUrl) missingFields.push("imageUrl");
        if (!category) missingFields.push("category");
        if (!condition) missingFields.push("condition");

        // Return error if any required field is missing
        if (missingFields.length > 0) {
            return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }
        await db.run('INSERT INTO listings ( userId, title, price, imageUrl, category, condition) VALUES (?, ?, ?, ?, ?, ?);', 
                        [userId, title, price, imageUrl, category, condition]);
        res.status(201).send({title, price, imageUrl, category, condition});
 
    } catch (error) {
 
        return res.status(400).send({ error: `Listing could not be created, + ${error}` });
    };
 
 }

 export async function getListings(req: Request, res: Response, db: Database, ) {
    try {
        const rows = await db.all("SELECT * FROM listings", []);
        return res.status(200).send({ data: rows });
    } catch (err) {
        console.error("Error retrieving listings:", err);
        return res.status(500).send({ error: `Failed to retrieve listings: ${err}` });
    }
}

 