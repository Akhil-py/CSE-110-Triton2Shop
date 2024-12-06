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
import { Database } from 'sqlite3';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

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
    console.log("Deserialized User:", user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});


/* Endpoints for Google OAuth */

// Route for Google OAuth login
app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: `http://localhost:${process.env.CLIENT_PORT}/login` }),
  (req, res) => {
    console.log("Authenticated User:", req.user); // Verify this logs the user object
    // Successful authentication redirection to home page
    res.redirect(`http://localhost:${process.env.CLIENT_PORT}/`);
  }
);

// Logout Route
app.post('/logout', (req: Request, res: Response) => {
  req.logout(err => {
      if (err) {
          return res.status(500).send({ error: 'Failed to log out.' });
      }
      req.session.destroy((err) => {
          if (err) {
              return res.status(500).send({ error: 'Failed to destroy session.' });
          }
          res.clearCookie('connect.sid'); // change
          return res.status(200).send({ message: 'Logged out successfully.' });
      });
  });
});

// Route to check if the user is logged in and returns the user id
app.get('/current-user', (req: Request, res: Response) => {
  if (req.isAuthenticated() && req.user) {
      const user = req.user as any; 
      res.json({ userId: user.id });
  } else {
      res.status(401).json({ userId: null }); // 401 if not logged in
  }
});


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

  // Add endpoints for requests
  createListingEndpoints(app, db);
  
  createRequestEndpoints(app, db);

  createFavoriteEndpoints(app, db);

  createProfileEndpoints(app, db);
 
  //createProductEndpoints(app, db);
})();

// Images are stored in /server/src/uploads with this
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// configure Multer with dynamic filename generation for image uploading
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //const uploadPath = path.join(__dirname, 'uploads');
    const uploadPath = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //default val, replaced later in app.post
},
});

const upload = multer({ storage });
const fileUploadTracker: Record<number, number> = {}; //tracks index of id to images uploaded

// Image upload endpoint
app.post('/upload', upload.array('images', 10), async (req, res, ) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      res.status(400).json({ error: 'No files uploaded or invalid format' });
      return;
    }
      const itemsDb = await listingsDB();
      const latestProduct = await itemsDb.get('SELECT MAX(id) AS id FROM Items');
      const currentId = (latestProduct?.id ?? 0) + 1;

    // Proceed with saving files and other logic
    if (!fileUploadTracker[currentId]) {
      fileUploadTracker[currentId] = 0;
    }
    const filePaths = req.files.map((file) => {
      const ext = path.extname(file.originalname);
      const index = fileUploadTracker[currentId];
      const filename = `${currentId}_${index}${ext}`;
      const uploadPath = path.join(__dirname, '..', 'uploads', filename);
      
      fs.renameSync(file.path, uploadPath); 
      fileUploadTracker[currentId] += 1;
      return `/uploads/${filename}`;
    });

    console.log('File paths:', filePaths);
    res.status(200).json({ filePaths });
} catch (error) {
    console.error('Error fetching product ID:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});
