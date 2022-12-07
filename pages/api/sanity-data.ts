import type { NextApiRequest, NextApiResponse } from 'next';
const sanityClient = require('@sanity/client');

const client = new sanityClient({
  dataset: process.env.SANITY_STUDIO_API_DATASET,
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || '',
  apiVersion: '2021-03-25',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const handler = async (req: NextApiRequest, res: NextApiResponse<string>) => {
  try {
    const data = await client.fetch(
      `*[_type match "customerportal"]`,
    );
    if (data && data[0]) {
      const links = data[0].links
      res.status(200).send(JSON.stringify({ links }));
    }
  } catch (e) {
    res.status(500).send(JSON.stringify({ error: e.message }));
    console.log(e)
  }
};

export default handler;