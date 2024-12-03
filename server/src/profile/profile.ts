// server/src/profile/profile.ts
import { Router, Request, Response } from 'express';
import User from '../models/user';

const router = Router();

// Route to get the user's profile
router.get('/profile', (req: Request, res: Response) => {
  // if (!req.isAuthenticated || !req.isAuthenticated()) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  const user = req.user as User;
  res.json({
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture
  });
});

export default router;