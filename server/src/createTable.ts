import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { Category, Condition, Status} from "./types"

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
 const statusValues= getEnumValues(Status);
//  await db.exec(`
//     CREATE TABLE IF NOT EXISTS listings (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         userId INTEGER,
//         title TEXT NOT NULL,
//         price REAL NOT NULL,
//         imageUrl TEXT NOT NULL,
//         category TEXT CHECK (category IN (${categoryValues})) NOT NULL,
//         condition TEXT CHECK (condition IN (${conditionValues})) NOT NULL
//     );
//  `);
  await db.exec("PRAGMA foreign_keys = ON;");
  await db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        googleId INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
	      profilePicture TEXT
    );

    CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY,
        sellerId INTEGER NOT NULL,
        itemName VARCHAR(255) NOT NULL,
        itemPicture TEXT,
        condition TEXT CHECK(condition IN (${conditionValues})) NOT NULL,
        price INTEGER NOT NULL,
        category TEXT CHECK(category IN (${categoryValues})) NOT NULL,
        description VARCHAR(255),
        datePosted DATETIME DEFAULT CURRENT_TIMESTAMP,
        quantity INTEGER DEFAULT 1,
        FOREIGN KEY (sellerId) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS Favorites (
        id INTEGER PRIMARY KEY,
        user INTEGER NOT NULL,
        item INTEGER NOT NULL,
        dateAdded DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user) REFERENCES Users(id),
        FOREIGN KEY (item) REFERENCES Items(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS Requests (
        id INTEGER PRIMARY KEY,
        item INTEGER NOT NULL,
        buyer INTEGER NOT NULL,
        dateRequested DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT CHECK(status IN (${statusValues})) NOT NULL,
        dismissed BOOLEAN DEFAULT 0,
        FOREIGN KEY (item) REFERENCES Items(id) ON DELETE CASCADE,
        FOREIGN KEY (buyer) REFERENCES Users(id)
    );

    CREATE TABLE IF NOT EXISTS TODO (
        id INTEGER PRIMARY KEY,
        sellerId INTEGER NOT NULL,
        purchaserId INTEGER NOT NULL,
        itemName VARCHAR(255) NOT NULL,
        FOREIGN KEY (sellerId) REFERENCES Users(id),
        FOREIGN KEY (purchaserId) REFERENCES Users(id)
    );

  `);
  const result = await db.get("PRAGMA foreign_keys;");
  console.log("Foreign key enforcement:", result);

 return db;
};

export default listingsDB;