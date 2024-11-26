import { Request, Response } from 'express';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { createListingEndpoints } from './listings/listings-endpoints';
import listingsDB from "./createTable";
import { Database } from 'sqlite3';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

// Middleware for session management
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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


// Serve static files from uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// initialize databases
//let currentId = 0;
//let latestProduct: { id: number } | undefined
(async () => {
  const itemsDb = await listingsDB();
  createListingEndpoints(app, itemsDb);
})();



// Configure Multer with dynamic filename generation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //placeholder, reolaced later in app.post
},
});

const upload = multer({ storage });

// Image upload endpoint
app.post('/upload', upload.array('images', 10), async (req, res, ) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      res.status(400).json({ error: 'No files uploaded or invalid format' });
      return;
    }
      const itemsDb = await listingsDB();
      const latestProduct = await itemsDb.get('SELECT MAX(id) AS id FROM listings');
      const currentId = (latestProduct?.id ?? 0) + 1;
      
    // Proceed with saving files and other logic
    const filePaths = req.files.map((file, index) => {
      const ext = path.extname(file.originalname);
      const filename = `${currentId}_${index}${ext}`;
      const uploadPath = path.join(__dirname, 'uploads', filename);

      fs.renameSync(file.path, uploadPath); 
      return `/uploads/${filename}`;
    });

    console.log('File paths:', filePaths);
    res.status(200).json({ filePaths });
} catch (error) {
    console.error('Error fetching product ID:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// start the server
app.get("/", (req: Request, res: Response) => {
  res.send({ "data": "Hello, TypeScript Express!" });
  res.status(200);
});
