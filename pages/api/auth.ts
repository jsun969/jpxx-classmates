import type { NextApiRequest, NextApiResponse } from 'next';

export default async function adminAuth(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }
  if (req.body.key === process.env.ADMIN_KEY) {
    return res.status(200).json({ result: 'OK' });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
