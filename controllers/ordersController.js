const Orders = require("../models/Orders");
const Topic = require("../models/Topic");
const Books = require("../models/Books");
const Video = require("../models/Video");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
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
    res.status(500).json({ error: "Error fetching orders" });
  }
};
exports.deleteOrder = async (req, res) => {
  try {
    const { orderCode } = req.params;

    const deletedOrder = await Orders.findOneAndDelete({ orderCode });

    if (!deletedOrder) {
      return res.status(404).json({ error: "ההזמנה לא נמצאה" });
    }

    res.json({ message: "ההזמנה נמחקה בהצלחה" });
  } catch (err) {
    console.error("שגיאה במחיקת ההזמנה:", err.message);
    res.status(500).json({ error: "שגיאה במחיקת ההזמנה" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { orderCode } = req.params;
    const updateData = req.body;

    const updatedOrder = await Orders.findOneAndUpdate({ orderCode }, updateData, {
      new: true,
    });

    if (!updatedOrder) {
      return res.status(404).json({ error: "ההזמנה לא נמצאה" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("שגיאה בעדכון ההזמנה:", err.message);
    res.status(500).json({ error: "שגיאה בעדכון ההזמנה" });
  }
};


const generateOrderEmailHtml = async (order) => {
  const books = await Books.find();
  const videos = await Video.find();
  const topics = await Topic.find();

  const totalPrice = order.products.reduce(
    (sum, p) => sum + Number(p.price || 0),
    0
  );

  const productList = order.products
    .map((p) => {
      let rowContent = "";

      if (p.bookCode !== undefined && p.bookCode !== null) {
        const book = books.find((x) => x.code === Number(p.bookCode));
        const topic = topics.find((x) => x.id === book.topicCode);
        rowContent = `
          <td style="border: 1px solid #cfcfcf; padding: 12px;"> ספר ${topic.name} ${book.signs}</td>
          <td style="border: 1px solid #cfcfcf; padding: 12px;">${p.size}</td>
          <td style="border: 1px solid #cfcfcf; padding: 12px;">${p.quantity}</td>
          <td style="border: 1px solid #cfcfcf; padding: 12px;">${p.price} ₪</td>
        `;
      } else {
        const video = videos.find((x) => x.code === p.videoCode);
        const topic = topics.find((x) => x.id === video.topicCode);
        rowContent = `
          <td style="border: 1px solid #cfcfcf; padding: 12px;"> סרטון ${
            topic.name
          } ${video.topicPart || ""} ${video.signsTopic || ""}</td>
          <td style="border: 1px solid #cfcfcf; padding: 12px;">-</td>
          <td style="border: 1px solid #cfcfcf; padding: 12px;">${
            p.quantity
          }</td>
          <td style="border: 1px solid #cfcfcf; padding: 12px;">${
            p.price
          } ₪</td>
        `;
      }

      return `<tr style="background-color: #f9f9f9;">${rowContent}</tr>`;
    })
    .join("");

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; text-align: center; background-color: #f2f2f2; padding: 30px;">
        <div style="max-width: 700px; margin: 0 auto; text-align: center; width: 100%;">
         <img src="https://res.cloudinary.com/ddh5xmwns/image/upload/v1750327984/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-19_120841_tkphib.png"
        alt="תודה על ההזמנה"
        style="width: 100%; margin-top: 30px; max-width: 700px; border-radius: 10px;height: auto;" />

      <h2 style="color: #252e49; font-size: 28px;">${order.fullName}, תודה על ההזמנה!</h2>

      <p style="font-size: 18px; color: #3b3b3b;"><strong>מספר הזמנה:</strong> ${order.orderCode}</p>
      <p style="font-size: 18px; color: #3b3b3b;"><strong>סטטוס הזמנה:</strong> ${order.status}</p>
      <p style="font-size: 18px; color: #3b3b3b;"><strong>כתובת למשלוח:</strong> ${order.address.street}, ${order.address.city}</p>
      <p style="font-size: 18px; color: #3b3b3b;"><strong>טלפון:</strong> ${order.phone}</p>

      <h3 style="margin-top: 40px; font-size: 24px; color: #558e9e;">פרטי ההזמנה:</h3>

      <table style="margin: 20px auto; border-collapse: collapse; width: 100%; font-size: 17px;">
        <thead>
          <tr style="background-color: #252e49; color: white;">
            <th style="border: 1px solid #cfcfcf; padding: 12px;">מוצר</th>
            <th style="border: 1px solid #cfcfcf; padding: 12px;">גודל</th>
            <th style="border: 1px solid #cfcfcf; padding: 12px;">כמות</th>
            <th style="border: 1px solid #cfcfcf; padding: 12px;">מחיר</th>
          </tr>
        </thead>
        <tbody>
          ${productList}
          <tr style="background-color: #e9ecef;">
            <td colspan="3" style="border: 1px solid #cfcfcf; padding: 14px; font-weight: bold; text-align: left; color: #252e49;">סה"כ</td>
            <td style="border: 1px solid #cfcfcf; padding: 14px; font-weight: bold; color: #252e49;">${totalPrice} ₪</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top: 40px; font-size: 17px; color: #858585;">
        אם ברצונכם לעדכן פרטי יצירת קשר, אנא השיבו להודעה זו ונשמח לעדכן עבורכם.
      </p>

     
    </div>
    </div>
  `;
};

const updateDB = async (products) => {
  for (const p of products) {
    if (p.bookCode !== undefined && p.bookCode !== null) {
      const code = Number(p.bookCode);
      const book = await Books.findOne({ code });

      if (!book) continue;

      // Decide which size was sold
      if (p.size === "גדול") {
        book.bigBooksSold += p.quantity;
        book.bigBooksQuantity -= p.quantity;
      } else {
        book.smallBooksSold += p.quantity;
        book.smallBooksQuantity -= p.quantity;
      }

      await book.save();
    }

    if (p.videoCode !== undefined && p.videoCode !== null) {
      const video = await Video.findOne({ code: p.videoCode });
      if (!video) continue;

      video.soldAmount += p.quantity;
      await video.save();
    }
  }
};

exports.addOrder = async (req, res) => {
  try {
    const { email, ...orderData } = req.body;
    debugger;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Set current date/time on server (in ISO format)
    orderData.orderDate = new Date();

    await updateDB(orderData.products);
    const newOrder = new Orders({ email, ...orderData });
    await newOrder.save();

    const emailHtml = await generateOrderEmailHtml(newOrder);

    // שליחת מייל למזמין
    await transporter.sendMail({
      from: `"דרך קצרה" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "תודה על הזמנתך",
      html: emailHtml,
    });

    // שליחת מייל למנהל החנות
    await transporter.sendMail({
      from: `"אתר דרך קצרה" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `התקבלה הזמנה חדשה מאת ${newOrder.fullName}`,
      html: emailHtml,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("שגיאה בשליחת מייל:", err.message);
    res.status(500).json({ error: "שגיאה בהזמנה או בשליחת המייל" });
  }
};
