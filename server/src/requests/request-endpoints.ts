import { Database } from "sqlite";
import { Request, Response } from "express";
import { createRequestServer, updateRequestStatus, dismissRequest } from "./request-utils";

export function createRequestEndpoints(app: any, db: Database) {
    console.log("Request endpoints initialized");
    // Create a new request
    app.post("/makerequest", (req: Request, res: Response) => {
        createRequestServer(req, res, db);
    });

    app.patch("/requests/status", async (req: Request, res: Response) => {
        await updateRequestStatus(req, res, db);
    });

    app.patch("/requests/dismiss", async (req:Request, res:Response) =>{
        await dismissRequest(req, res, db);
    })
}
