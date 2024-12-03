import { Database } from "sqlite";
import { Request, Response } from "express";
import { getUser } from "./profile-utils";

export function createProfileEndpoints(app: any, db: Database) {
    // Get user's name, email, and profile picture
    app.get("/user/:userId", async (req: Request, res: Response) => {
        await getUser(req, res, db);
    });
}