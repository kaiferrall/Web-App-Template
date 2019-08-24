const mailer = require("nodemailer");
const { generalError } = require("./errorService");

exports.sendEmail = async ({ ...options }) => {
  let mailOptions = {
    from: "no.reply.pitchdev@gmail.com",
    to: options.to,
    subject: options.subject
  };
  if (options.link) {
    mailOptions.html =
      "<a href='" + options.text + "'>" + options.topic + "</a>";
  } else {
    mailOptions.html = "<p>" + options.text + "</p>";
  }
  try {
    const transporter = mailer.createTransport({
      service: "gmail",
      auth: {
        user: "no.reply.pitchdev@gmail.com",
        pass: "PitchdevEmail"
      }
    });
    await transporter.sendMail(mailOptions);
  } catch (e) {
    console.log(e);
    throw generalError("Error sending email.", 400, "mailing", false);
  }
};
