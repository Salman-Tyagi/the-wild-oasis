import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';
// sgMail.configure(process.env.SENDGRID_API_KEY);

const email = async options => {
  if (process.env.NODE_ENV === 'development') {
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: 'salman@salman.com <DEVELOPMENT>',
      to: options.email,
      subject: options.subject,
      text: options.message,
      // html: '<b>Hello world?</b>',
    };

    await transport.sendMail(mailOptions);
  } else {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const mailOptions = {
      to: options.email,
      from: 'salman@mailsac.com',
      subject: options.subject,
      text: options.message,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };

    await sgMail.send(mailOptions);
  }
};

export default email;
