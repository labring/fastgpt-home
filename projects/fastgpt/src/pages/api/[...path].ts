import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await axios({
      method: req.method,
      url: `${process.env.CLOUD_DOMAIN}${req.url}`,
      data: req.body,
      headers: {
        authorization: req.headers.authorization
      }
    });

    res.status(response.status).json(response.data);
  } catch (error: any) {
    console.log(error);

    res.status(error?.response?.status || 500).json(error?.response?.data || 'An error occurred');
  }
}
