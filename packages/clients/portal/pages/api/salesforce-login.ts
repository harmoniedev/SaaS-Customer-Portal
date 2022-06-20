import jwt from 'jsonwebtoken';
import { label } from 'next-api-middleware';
import { isUserValid } from '../../helpers/api/users';
import cookies from '../../helpers/api/cookies';

const verifyOptions = {
  expiresIn: '12h'
}

const withMiddleware = label({
  cookies,
});

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const resp = await isUserValid(email, password);
      const userIsValid = resp.isValid;
      const name = resp.name;
      if (userIsValid) {
        const token = jwt.sign({ email, password, name }, process.env.JWT_TOKEN, verifyOptions);
        res.cookie('download-token', token);
        return res.status(200).end();
      }
      return res.status(401).end();
    } catch (error) {
      console.log(error)
      return res.status(500).end();
    }
  }
  return res.status(400).end();
};

export default withMiddleware('cookies')(handler);
