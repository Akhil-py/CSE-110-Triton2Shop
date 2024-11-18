import { Request, Response } from 'express';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createListingEndpoints } from './listings/listings-endpoints';
import listingsDB from "./createTable";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const cors   = require('cors');

// Middleware for session management
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(cors());
app.use(express.json());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration for Google OAuth
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    // Handle user profile data here
    done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});

// Route for Google OAuth login
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to your desired page
    res.redirect('http://localhost:3000/');
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Initialize the database and start the server
(async () => {
  const db = await listingsDB();
 
  // Root endpoint to get test if the server is running
  app.get("/", (req: Request, res: Response) => {
    res.send({ "data": "Hello, TypeScript Express!" });
    res.status(200);
  });
 
  createListingEndpoints(app, db);
 
  //createProductEndpoints(app, db);
 
 })();
