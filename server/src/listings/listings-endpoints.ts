import express from 'express';
import cors from 'cors';
import { Database } from "sqlite";
import { Request, Response } from 'express';
// import { createListingServer, getListings } from "./listings-utils";

// export function createListingEndpoints(app: any, db: Database) {
//    // Create a new listing
//    app.post("/listing", (req: Request, res: Response) => {

//        createListingServer(req, res, db);

//    });

//    app.get("/listing", (req: Request, res: Response) => {

//         getListings(req, res, db);

//     });

// }

import { createItemServer, getItems, getItem } from "./listings-utils";
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

export function createListingEndpoints(app: any, db: Database) {
   // Create a new listing
   app.post("/listing", (req: Request, res: Response) => {
      console.log("POST /listing endpoint hit");
      console.log("Incoming request data:", req.body);
      createItemServer(req, res, db);

   });

   app.get("/listing", (req: Request, res: Response) => {

        getItems(req, res, db);

    });

    app.get("/listing/:listingId", (req: Request, res: Response) => {
        console.log("GET /listing/:listingId endpoint hit");
        console.log("Incoming request data:", req.params);
        getItem(req, res, db);
    });

}

