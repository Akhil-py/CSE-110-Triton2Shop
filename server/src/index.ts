import { Request, Response } from 'express';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createListingEndpoints } from './listings/listings-endpoints';
import { createRequestEndpoints } from "./requests/request-endpoints";
import { createFavoriteEndpoints } from "./favorites/favorite-endpoints";
import { createProfileEndpoints } from './profile/profile-endpoints';
import listingsDB from "./createTable";
import sequelize from './db';
import User from './models/user';

dotenv.config();

sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Unable to connect to the database:', err));

sequelize.sync()
  .then(() => console.log('Database synced successfully!'))
  .catch((err) => console.error('Error syncing database:', err));

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

app.use(session({ secret: 'your_secret_key', 
  resave: false, 
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    secure: true 
  } 
}));

app.use(cors({
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true
}));

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
          email: profile.emails ? profile.emails[0].value : '',
          profilePicture: profile.photos ? profile.photos[0].value : ''
        },
      });

      return done(null, user); // This will call serializeUser
    } catch (err) {
      return done(err, false);
    }
  }
));

// Serialize user instance to the session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user instance from the session
passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
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
    res.redirect(`http://localhost:${process.env.CLIENT_PORT}/`);
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

  // Add endpoints for requests
  createRequestEndpoints(app, db);

  createFavoriteEndpoints(app, db);

  createProfileEndpoints(app, db);
 
  //createProductEndpoints(app, db);
})();
