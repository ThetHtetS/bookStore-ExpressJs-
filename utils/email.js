const nodemailer = require('nodemailer');

const sendEmail = async options => {
  //1) Create a transporter
  // const transporter = nodemailer.createTransport({
  //   host: 'sandbox.smtp.mailtrap.io',
  //   port: 2525,
  //   auth: {
  //     user: '0d8d7da63904eb',
  //     pass: '69119479803115'
  //   }
  // });
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // const transporter = nodemailer.createTransport({
  //   auth: {
  //     user: 'thethtetsoe114@gmail.com',
  //     pass: 'thethtetsoe114140'
  //   }
  // });

  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'koking43.am@gmail.com',
  //     pass: 'thethtetsoe114140'
  //   }
  // });
  // 2) Define the email options
  const mailOptions = {
    from: 'thethtetsoe114@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
