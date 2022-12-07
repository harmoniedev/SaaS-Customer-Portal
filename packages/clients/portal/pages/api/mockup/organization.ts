import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  if (!req.headers.authorization)
    res.status(403).send(JSON.stringify({ status: 403, message: 'Not Allowed' }));
  const { tid } = req.query;
  if (!tid)
    res.status(404).send(JSON.stringify({ status: 404, message: 'Not Found' }));

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const organizationData = await db
    .collection('organization')
    .find({ tid })
    .toArray();
  res.status(200).send(JSON.stringify({ organizationData }));
};

export default handler;
