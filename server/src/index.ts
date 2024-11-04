import { Request, Response } from 'express';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
