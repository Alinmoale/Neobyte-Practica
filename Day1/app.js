
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.urlencoded({ extended: true }));

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "251fd2a79c2c8b",
    pass: "1cf2e9e3005506"
  }
});

app.post('/email', (req, res) => {

  const { email, subject, body } = req.body;
  const mailOptions = {
    from: email,
    to: 'moalealin15@gmail.com', 
    subject,
    text: body
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ', info.response);
      res.send('Email sent successfully!');
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});




