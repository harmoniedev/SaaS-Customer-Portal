import { getPasswordForUser, sendResetPasswordEmail } from '../../helpers/api/users';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;
    try {
      const password = await getPasswordForUser(email);
      console.log(password, 33)
      if (password) {
        await sendResetPasswordEmail(email, password);
        return res.status(200).end();
      }
      return res.status(401).end();
    } catch (error) {
      console.log(error.message)
      return res.status(500).end();
    }
  }
  return res.status(400).end();
};

export default handler;