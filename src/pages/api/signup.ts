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
        res.status(201).json(user);
      } catch (error: any) {
        res.status(400).json({ message: 'Error creating user' });
      }
      break;
    }
    default:
      res.status(405).json({ status: 'error', message: 'Method not allowed' });
      break;
  }
}
