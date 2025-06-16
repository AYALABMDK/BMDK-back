const Orders = require('../models/Orders');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

const generateOrderEmailHtml = (order) => {
  const productList = order.products
    .map(
      (p) =>
        `<li>קוד ספר: ${p.bookCode}, גודל: ${p.size}, כמות: ${p.quantity}, סה"כ מחיר: ${p.price}₪</li>`
    )
    .join('');

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif;">
      <h2>תודה על ההזמנה!</h2>
      <p>מספר הזמנה: ${order.orderCode}</p>
      <p>קוד תלמיד: ${order.studentCode}</p>
      <p>סטטוס: ${order.status}</p>
      <p><strong>פרטי הזמנה:</strong></p>
      <ul>${productList}</ul>
    </div>
  `;
};

exports.addOrder = async (req, res) => {
  try {
    const { email, ...orderData } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const newOrder = new Orders({ ...orderData });
    await newOrder.save();

    const emailHtml = generateOrderEmailHtml(newOrder);

    // שליחת מייל למזמין
    await transporter.sendMail({
      from: `"דרך קצרה" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'תודה על הזמנתך',
      html: emailHtml,
    });

    // שליחת מייל למנהל החנות
    await transporter.sendMail({
      from: `"אתר דרך קצרה" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `התקבלה הזמנה חדשה מקוד תלמיד ${newOrder.studentCode}`,
      html: emailHtml,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error('שגיאה בשליחת מייל:', err.message);
    res.status(500).json({ error: 'שגיאה בהזמנה או בשליחת המייל' });
  }
};
