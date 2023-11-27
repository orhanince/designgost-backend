const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    await sendgrid.send({
      to: process.env.SENDGRID_SENDER,
      from: process.env.SENDGRID_SENDER,
      subject,
      html,
    });
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  sendEmail,
};
