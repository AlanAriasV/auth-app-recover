import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD,
  },
  secure: true,
});

export const sendEmail = async (
  email: string,
  subject: string,
  text: string,
  html: string,
) => {
  const mailData: Mail.Options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailData);

    return {
      status: 200,
      message: 'Email sent',
    };
  } catch (err: any) {
    return {
      status: 400,
      message: err.message,
    };
  }
};
