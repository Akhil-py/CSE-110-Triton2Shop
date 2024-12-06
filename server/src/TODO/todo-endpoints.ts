import { Database } from "sqlite";
import { Request, Response } from "express";
import { insertIntoTODO, fetchTODOByUserId, deleteTODOById } from "./todo-utils";

export function createTODOEndpoints(app: any, db: Database) {
    console.log("TODO endpoints initialized");

    // Insert a new TODO
    app.post("/todo", (req: Request, res: Response) => {
        insertIntoTODO(req, res, db);
    });

    // Fetch all TODOs where the given userId is either the seller or purchaser
    app.get("/todo/:userId", (req: Request, res: Response) => {
        fetchTODOByUserId(req, res, db);
    });

    // Delete a TODO by its ID
    app.delete("/todo/:todoId", (req: Request, res: Response) => {
        deleteTODOById(req, res, db);
    });
}

