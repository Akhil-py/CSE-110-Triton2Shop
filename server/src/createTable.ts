import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Category, Condition} from "./types"

const listingsDB = async () => {
 // Open the database connection
 const db = await open({
   filename: "listings-database.sqlite",
   driver: sqlite3.Database, 
 });
 // helper function to get the values from types.ts
 const getEnumValues = (enumObj: any): string => {
    return Object.values(enumObj).map(value => `'${value}'`).join(', ');
};
 // Creates table of the listings
 // userID will reference usernames when database of user authentication is implemented
 // for now they will be NULL
 const categoryValues = getEnumValues(Category);
 const conditionValues = getEnumValues(Condition);
 await db.exec(`
    CREATE TABLE IF NOT EXISTS listings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        imageUrl TEXT NOT NULL,
        category TEXT CHECK (category IN (${categoryValues})) NOT NULL,
        condition TEXT CHECK (condition IN (${conditionValues})) NOT NULL
    );
 `);
 return db;
};

export default listingsDB;