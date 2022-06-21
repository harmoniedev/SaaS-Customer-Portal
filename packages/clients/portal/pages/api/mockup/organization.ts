import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    if (!req.headers.authorization)
      res.status(403).send(JSON.stringify({ status: 403, message: 'Not Allowed' }));
    const { tid } = req.query;
    // was added because tokens will be parsed on BE, just for test will use the default tid
    const tenant = tid !== 'undefined' ? tid : process.env.APP_TENANT_ID

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const organizationData = await db
      .collection('organization')
      .find({ tid: tenant })
      .toArray();
    
    console.log(organizationData, 123)
    res.status(200).send(JSON.stringify({ organizationData }));
  } catch (e) {
    console.log(e.message)
    res.status(500)
  }
};

export default handler;
