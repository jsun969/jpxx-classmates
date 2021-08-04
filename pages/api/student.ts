import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function postStudent(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'MethodNotAllowed' });
  }
  await prisma.student.create({ data: req.body });
  return res.status(201).json({ result: 'Created' });
}
