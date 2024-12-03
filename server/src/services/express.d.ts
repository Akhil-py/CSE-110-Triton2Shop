import User from '../models/User';

declare global {
  namespace Express {
    interface User extends User {}
  }
}
