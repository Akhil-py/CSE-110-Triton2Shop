import { Request, Response } from 'express';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createListingEndpoints } from './listings/listings-endpoints';
import listingsDB from "./createTable";
import sequelize from './db';
import User from './models/user';
import profileRoutes from './profile/profile';

dotenv.config();

sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Unable to connect to the database:', err));

sequelize.sync({ alter: true })
  .then(() => console.log('Database synced successfully!'))
  .catch((err) => console.error('Error syncing database:', err));

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

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
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Find or create the user in the database
      const [user, created] = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: {
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : null,
          profilePicture: profile.photos ? profile.photos[0].value : null
        }
      });

      done(null, user);
    } catch (err) {
      done(err, false);
    }
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
    // Successful authentication redirection to home page
    res.redirect('http://localhost:3000/');
  }
);

// Use profile routes
app.use(profileRoutes);

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
