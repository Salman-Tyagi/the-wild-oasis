import nodemailer from 'nodemailer';

const email = async options => {
  const transport = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f0f0e4117f6bc9',
      pass: '0a0679baabeb50',
    },
  });

  const mailOptions = {
    from: 'salman@salman.com <TEMP>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: '<b>Hello world?</b>',
  };

  await transport.sendMail(mailOptions);
};

export default email;
