import nodemailer from 'nodemailer';

const sendEmail = ({ subject = 'Hello harmon', to, html, text }) =>
  new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      maxConnections: 3,
      pool: true,
      host: 'smtp.sendgrid.net',
      port: 465,
      secureConnection: true,
      auth: {
        user: 'apikey',
        pass: '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',
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    const settings = {
      from: '"harmon.ie" <noreply@harmon.ie>',
      bcc: to.join(', '),
      subject,
      html,
      text,
    };

    console.log(`[${new Date().toISOString()}]: Sending email...`);
    transporter.sendMail(settings, err => {
      if (err) {
        return reject(new Error(err.message));
      }
      console.log(`[${new Date().toISOString()}]: email sent successfully`);
      return resolve(true);
    });
  });

export default sendEmail;
