import { Database } from "sqlite";
import { Request, Response } from 'express';
import { createListingServer, getListings } from "./listings-utils";

export function createListingEndpoints(app: any, db: Database) {
   // Create a new listing
   app.post("/listing", (req: Request, res: Response) => {

       createListingServer(req, res, db);

   });

   app.get("/listing", (req: Request, res: Response) => {

        getListings(req, res, db);

    });

}

