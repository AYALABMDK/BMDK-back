const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${name}" <${process.env.GMAIL_USER}>`, // תישאר הכתובת שלך, עם השם של השולח
    replyTo: email, // זאת הכתובת של השולח
    to: process.env.GMAIL_USER,
    subject: `הודעה חדשה מאת ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "ההודעה נשלחה בהצלחה" });
  } catch (error) {
    console.error("שגיאה בשליחת מייל:", error);
    res.status(500).json({ success: false, message: "שגיאה בשליחת מייל" });
  }
};

module.exports = {
  sendEmail,
};
