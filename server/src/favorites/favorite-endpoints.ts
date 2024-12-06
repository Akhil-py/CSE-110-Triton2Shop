import { Database } from "sqlite";
import { Request, Response } from "express";
import { getUserFavorites, addFavorite, deleteFavorite } from "./favorite-utils";

export function createFavoriteEndpoints(app: any, db: Database) {
    console.log("Favorite endpoints initialized");
    // List all of a user's favorites. returns all of the item description
    app.get("/favorites/:userId", async (req: Request, res: Response) => {
        getUserFavorites(req, res, db);
    });
    
    // Add a new favorite
    app.post("/favorites", async (req: Request, res: Response) => {
        addFavorite(req, res, db);
    });

    // Delete a favorite
    app.delete("/favorites", async (req: Request, res: Response) => {
        deleteFavorite(req, res, db);
    });

    
}