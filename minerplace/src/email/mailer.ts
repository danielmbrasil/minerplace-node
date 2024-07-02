import Nodemailer from 'nodemailer';

const mailer = Nodemailer.createTransport({
  jsonTransport: true,
});

export { mailer };
