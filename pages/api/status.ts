import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function postStudent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }
  if (req.headers['admin-key'] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  await prisma.student.update({ where: { id: req.body.id }, data: { status: req.body.status } });
  res.status(200).json({ result: 'OK' });
}
