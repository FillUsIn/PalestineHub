import type { NextApiRequest, NextApiResponse } from 'next';
import { createUserAccount } from '@/api/users';
import { CreateUserDTO } from '../../types/dtos';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;

  switch (requestMethod) {
    case 'POST': {
      const body = JSON.parse(req.body) as CreateUserDTO;
      try {
        const user = await createUserAccount(body);
        if (user) {
          res.json(user);
        }
      } catch (error) {
        res.json({ Error: error });
      }
      break;
    }
    default:
      res.json({ message: 'use POST request to signup' });
      break;
  }
}
