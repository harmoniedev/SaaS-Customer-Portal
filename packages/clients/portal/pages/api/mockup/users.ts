import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
const ObjectId = require('mongodb').ObjectID;

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  if (!req.headers.authorization)
    res.status(403).send(JSON.stringify({ status: 403, message: 'Not Allowed' }));
  const { tid } = req.query;
  if (!tid)
    res.status(404).send(JSON.stringify({ status: 404, message: 'Not Found' }));

  if (req.method === 'GET') {
    const { orderedby, query, direction, page = 0, perPage = 10 } = req.query;
    const pageNumber = +page || 0;
    const perPageNumber = +perPage || 10;
    const orderedKey = Array.isArray(orderedby) ? orderedby[0] : orderedby;
    const directionValue = direction === 'asc' ? 1 : -1;
    const sort = { [orderedKey]: directionValue };
    const data = await db
      .collection('users')
      .aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: query, $options: 'i' } },
              { email: { $regex: query, $options: 'i' } },
            ],
          },
        },
        { $match: { tid: tid } },
        {
          $project: {
            name: 1,
            email: 1,
            license: 1,
            role: 1,
            department: 1,
            lastActiveDate: {
              $dateFromString: {
                dateString: '$lastActiveDate',
              },
            },
          },
        },
        { $sort: { ...sort } },
        {
          $facet: {
            users: [
              { $skip: pageNumber * perPageNumber },
              { $limit: perPageNumber },
            ],
            pagination: [{ $count: 'total' }],
          },
        },
      ])
      .toArray();

    res.status(200).send(
      JSON.stringify({
        users: data[0].users,
        total: data[0].pagination[0] ? data[0].pagination[0].total : 0,
        page,
        perPage,
      }),
    );
  } else if (req.method === 'DELETE') {
    const { userId } = req.query;
    if (!userId)
      res
        .status(404)
        .send(JSON.stringify({ status: 404, message: 'User id is required' }));

    const data = await db.collection('users').deleteOne({ _id: ObjectId(userId) });
    if (data.deletedCount > 0) res.status(200).send(JSON.stringify({ status: 200 }));
  } else if (req.method === 'PATCH') {
    const payload = req.body;
    const { userId } = req.query;
    if (!userId)
      res
        .status(404)
        .send(JSON.stringify({ status: 404, message: 'User id is required' }));
    const users = await db
      .collection('users')
      .updateOne({ _id: ObjectId(userId) }, { $set: { ...payload } });
    if (users.modifiedCount > 0)
      res.status(200).send(JSON.stringify({ status: 200 }));
  } else if (req.method === 'POST') {
    const payload = req.body;
    const { name, email, role, license } = payload;

    if (!name || !email || !role || !license)
      res.status(404).send(
        JSON.stringify({
          status: 404,
          message: 'You need to pass all required fields',
        }),
      );

    const user = {
      ...payload,
      tid,
      lastActiveDate: new Date().toISOString(),
    };

    const data = await db.collection('users').insertOne(user);
    if (data.insertedId) res.status(200).send(JSON.stringify({ status: 200 }));
  }
};

export default handler;
