// import { MarketplaceListing, Category, Condition } from "../types";
// import { Database } from "sqlite";
// import { Request, Response } from "express";

// export async function createListingServer(req: Request, res: Response, db: Database) {

//     try {
//         // Type casting the request body to the expected format.
//         const { userId, title, price, imageUrl, category, condition} = req.body as 
//                 {  userId: number, title: string, price: number, imageUrl: string, category: Category, condition: Condition };
//  /*
//         if ( !id|| !title|| !price|| !imageURL|| !category || !condition) {
//             return res.status(400).send({ error: "Missing required fields" });
//         }
// */
//         const missingFields = [];
//         if (!userId) missingFields.push("userId");
//         if (!title) missingFields.push("title");
//         if (!price) missingFields.push("price");
//         if (!imageUrl) missingFields.push("imageUrl");
//         if (!category) missingFields.push("category");
//         if (!condition) missingFields.push("condition");

//         // Return error if any required field is missing
//         if (missingFields.length > 0) {
//             return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
//         }
//         await db.run('INSERT INTO listings ( userId, title, price, imageUrl, category, condition) VALUES (?, ?, ?, ?, ?, ?);', 
//                         [userId, title, price, imageUrl, category, condition]);
//         res.status(201).send({title, price, imageUrl, category, condition});
 
//     } catch (error) {
 
//         return res.status(400).send({ error: `Listing could not be created, + ${error}` });
//     };
 
//  }

//  export async function getListings(req: Request, res: Response, db: Database, ) {
//     try {
//         const rows = await db.all("SELECT * FROM listings", []);
//         return res.status(200).send({ data: rows });
//     } catch (err) {
//         console.error("Error retrieving listings:", err);
//         return res.status(500).send({ error: `Failed to retrieve listings: ${err}` });
//     }
// }


import { Category, Condition } from "../types";
import { Database } from "sqlite";
import { Request, Response } from "express";

// export async function createItemServer(req: Request, res: Response, db: Database) {
//     try {
//         // Extract fields from the request body
//         const { sellerId, itemName, price, itemPicture, category, condition, description } = req.body as {
//             sellerId: number,
//             itemName: string,
//             price: number,
//             itemPicture: string,
//             category: Category,
//             condition: Condition,
//             description?: string,
//         };

//         // Validate missing fields
//         const missingFields = [];
//         if (!sellerId) missingFields.push("sellerId");
//         if (!itemName) missingFields.push("itemName");
//         if (!price) missingFields.push("price");
//         if (!category) missingFields.push("category");
//         if (!condition) missingFields.push("condition");

//         if (missingFields.length > 0) {
//             return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
//         }

//         // Insert the new item into the Items table
//         await db.run(
//             `INSERT INTO Items (sellerId, itemName, price, itemPicture, category, condition, description, datePosted, quantity) 
//              VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 1);`,
//             [sellerId, itemName, price, itemPicture, category, condition, description || null]
//         );

//         res.status(201).send({ sellerId, itemName, price, itemPicture, category, condition, description });
//     } catch (error) {
//         console.error("Error creating item:", error);
//         return res.status(400).send({ error: `Item could not be created: ${error}` });
//     }
// }

export async function createItemServer(req: Request, res: Response, db: Database) {
    try {
        // Extract fields from the request body
        let { sellerId, itemName, price, itemPicture, category, condition, description } = req.body as {
            sellerId: any, // 'any' here to allow type checking
            itemName: string,
            price: any, // 'any' here to allow type checking
            itemPicture: string,
            category: Category,
            condition: Condition,
            description?: string,
        };

        // Debugging: Log the incoming request data
        console.log("Incoming request data:", req.body);

        // Ensure sellerId and price are valid numbers
        sellerId = parseInt(sellerId, 10);
        price = parseFloat(price);

        // Debugging: Log the parsed values
        console.log("Parsed sellerId:", sellerId);
        console.log("Parsed price:", price);

        // Check if sellerId and price are valid numbers
        if (isNaN(sellerId)) {
            return res.status(400).send({ error: "sellerId must be a valid number" });
        }
        if (isNaN(price)) {
            return res.status(400).send({ error: "price must be a valid number" });
        }

        // Validate missing fields
        const missingFields = [];
        if (!sellerId) missingFields.push("sellerId");
        if (!itemName) missingFields.push("itemName");
        if (!price) missingFields.push("price");
        if (!category) missingFields.push("category");
        if (!condition) missingFields.push("condition");

        if (missingFields.length > 0) {
            console.log("Missing fields:", missingFields); // Debugging: Log the missing fields
            return res.status(400).send({ error: `Missing required fields: ${missingFields.join(", ")}` });
        }

        // Insert the new item into the Items table
        await db.run(
            `INSERT INTO Items (sellerId, itemName, price, itemPicture, category, condition, description, datePosted, quantity) 
             VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 1);`,
            [sellerId, itemName, price, itemPicture, category, condition, description || null]
        );

        console.log("Item successfully created:", { sellerId, itemName, price, itemPicture, category, condition, description }); // Debugging: Log the created item

        res.status(201).send({ sellerId, itemName, price, itemPicture, category, condition, description });
    } catch (error) {
        console.error("Error creating item:", error); // Log the error
        return res.status(400).send({ error: `Item could not be created: ${error}` });
    }
}



export async function getItems(req: Request, res: Response, db: Database) {
    try {
        // Retrieve all items from the Items table
        const rows = await db.all("SELECT * FROM Items", []);
        return res.status(200).send({ data: rows });
    } catch (err) {
        console.error("Error retrieving items:", err);
        return res.status(500).send({ error: `Failed to retrieve items: ${err}` });
    }
}


 

 