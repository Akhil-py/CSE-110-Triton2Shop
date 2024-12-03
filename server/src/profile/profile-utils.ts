import { Database } from "sqlite";
import { Request, Response } from "express";

export async function getUser(req: Request, res: Response, db: Database) {
    try {
        const { userId } = req.params;

        if (!userId || isNaN(Number(userId))) {
            return res.status(400).send({ error: "Missing required parameter: userId" });
        }

        // Query to get all favorite items for the user
        const query = `
            SELECT 
                name,
                email,
                profilePicture
            FROM 
                Users
            WHERE
                Users.id = ?;
        `;

        // Execute the query
        const user = await db.get(query, [userId]);

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Respond with the results
        res.status(200).send({ user });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).send({ error: `Could not fetch user: ${error}` });
    }
}

/** 
export function currentUser(req: Request, res: Response) {
    if (req.isAuthenticated() && req.user) {
        // Assuming 'User' has 'id', 'name', and 'email' fields
        const user = {
          id: req.user.id,
          name: req.user.name,
          email: req.user.email,
          profilePicture: req.user.profilePicture,
        };
        res.status(200).json({ user });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}
*/

// // Middleware to check authentication
// function isAuthenticated(req: Request, res: Response, next: Function) {
//     if (req.isAuthenticated()) {
//       return next();
//     }
//     res.status(401).json({ error: 'Unauthorized' });
//   }
