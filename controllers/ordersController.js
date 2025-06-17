const Orders = require('../models/Orders');
const Topic = require('../models/Topic');
const Books = require('../models/Books');
const Video = require('../models/Video');
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

const generateOrderEmailHtml = async(order) => {

  const books = await Books.find();
  const videos = await Video.find();
  const topics = await Topic.find();
  console.log(topics);

  const productList = order.products
  .map((p) => {
    const parts = [];
    if (p.bookCode !== undefined && p.bookCode !== null) {
      const book = books.find(x => x.code === Number(p.bookCode));
      const topic = topics.find(x => x.id === book.topicCode);
      parts.push(`<strong>ספר ${topic.name} ${book.signs} </strong>קוד ספר: ${p.bookCode}, גודל: ${p.size}, `);
    }
    else {
      const video = videos.find(x => x.code === p.videoCode);
      const topic = topics.find(x => x.id === video.topicCode);
      parts.push(`<strong>סרטונים ${topic.name} ${video.topicPart} ${video.signsTopic} </strong>קוד סרטונים: ${p.videoCode}, `)
    }
    parts.push(`כמות: ${p.quantity}, סה"כ מחיר: ${p.price}₪`);

    return `<li>${parts.join('')}</li>`;
  })
  .join('');

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif;">
      <h2>${order.fullName}, תודה על ההזמנה!</h2>
      <p>מספר הזמנה: ${order.orderCode}</p>
      <p>סטטוס הזמנה: ${order.status}</p>
      <p>כתובת למשלוח: ${order.address.street}, ${order.address.city}</p>
      <p>טלפון ליצירת קשר המעודכן אצלנו: ${order.phone}</p>
      <p><strong>פרטי הזמנה:</strong></p>
      <ul>${productList}</ul>
    </div>
  `;
};

exports.addOrder = async (req, res) => {
  try {
    const { email, ...orderData } = req.body;
    debugger;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const newOrder = new Orders({ email, ...orderData });
    await newOrder.save();

    const emailHtml = await generateOrderEmailHtml(newOrder);

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
