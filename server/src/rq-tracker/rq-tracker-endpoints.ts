import { Database } from "sqlite";
import { Request, Response } from "express";
import { fetchRequestsSentByUserServer, fetchRequestsForSellerServer, deleteRequestById } from "./rq-tracker-utils";

export function createRQTrackerEndpoints(app: any, db: Database) {
    console.log("Request Tracker endpoints initialized");

    // Fetch all requests sent by the current user
    app.get("/requests/sent/:userId", (req: Request, res: Response) => {
        fetchRequestsSentByUserServer(req, res, db);
    });

    // Fetch all requests for items the current user is selling
    app.get("/requests/received/:userId", (req: Request, res: Response) => {
        fetchRequestsForSellerServer(req, res, db);
    });

    // DELETE a request by ID
    app.delete("/requests/delete/:requestId", async (req: Request, res: Response) => {
        const requestId = parseInt(req.params.requestId, 10);

        // Validate the requestId
        if (isNaN(requestId)) {
            return res.status(400).json({ message: "Invalid request ID" });
        }

        try {
            const success = await deleteRequestById(requestId, db);  // Call deleteRequestById utility

            if (success) {
                return res.status(200).json({ message: "Request successfully deleted" });
            } else {
                return res.status(404).json({ message: "Request not found" });
            }
        } catch (error) {
            console.error("Error deleting request:", error);
            return res.status(500).json({ message: "Error deleting request" });
        }
    });
}
