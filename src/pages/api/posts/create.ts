import type { NextApiRequest, NextApiResponse } from 'next';
import { createSubcategoryPost } from '@/api/posts';
import { CreatePostDTO } from '@/types/dtos';
import { getAuthorizationHeader } from '@/api/comments';
import { getToken } from 'next-auth/jwt';

type ReqBody = { subCategoryName: string } & CreatePostDTO;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestMethod = req.method;
  const token = await getToken({ req });
  const accessToken = token?.accessToken;
  switch (requestMethod) {
    case 'POST': {
      getAuthorizationHeader();
      const { subCategoryName, ...rest } = JSON.parse(req.body) as ReqBody;

      try {
        const data = await createSubcategoryPost(
          subCategoryName,
          rest,
          accessToken
        );
        res.status(201).json(data);
      } catch (error: any) {
        console.log(error.message);
        res.status(error.response.status).json({ message: error.message });
      }
      break;
    }
    default:
      res.status(405).json({ status: 'error', message: 'Method not allowed' });
      break;
  }
}
