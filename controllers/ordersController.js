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
const baseUrl = process.env.FRONTEND_URL || "http://localhost:3000";

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

const generateStatusEmailHtml = (fullName, status, orderCode) => {
  const statusText =
    status === "נשלחה" ? "ההזמנה שלך יצאה לדרך!" : "ההזמנה נמסרה אליך!";
  const subText =
    status === "נשלחה"
      ? "ההזמנה שלך נשלחה והיא בדרכה אליך.<br><br>נשמח שתעדכנו אותנו אם קיבלתם את ההזמנה בלחיצה על הכפתור הבא:"
      : "אנו שמחים לבשר שההזמנה שלך סופקה בהצלחה.";

  const confirmationButton =
    status === "נשלחה"
      ? `
    <a href="${baseUrl}/confirm-page/${orderCode}" 
       style="display: inline-block; background-color: #252e49; color: #fff; padding: 14px 24px; border-radius: 8px; text-decoration: none; font-size: 18px; margin-top: 20px;">
      אישור קבלת ההזמנה
    </a>
    `
      : "";

  return `
    <div dir="rtl" style="font-family: Arial, sans-serif; text-align: center; background-color: #f2f2f2; padding: 30px;">
      <div style="max-width: 700px; margin: 0 auto;">
        <img src="https://res.cloudinary.com/ddh5xmwns/image/upload/v1750327984/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2025-06-19_120841_tkphib.png"
          alt="${statusText}"
          style="width: 100%; margin-top: 30px; max-width: 700px; border-radius: 10px;height: auto;" />
        <h2 style="color: #252e49; font-size: 28px;">${fullName}, ${statusText}</h2>
        <p style="font-size: 18px; color: #3b3b3b;">${subText}</p>
        ${confirmationButton}
        <p style="margin-top: 40px; font-size: 17px; color: #858585;">
          תודה שהזמנתם מאיתנו,<br>צוות דרך קצרה.
        </p>
      </div>
    </div>
  `;
};
exports.addOrder = async (req, res) => {
  try {
    const { email, ...orderData } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    orderData.orderDate = new Date();

    await updateDB(orderData.products);
    const newOrder = new Orders({ email, ...orderData });
    await newOrder.save();

    const emailHtml = await generateOrderEmailHtml(newOrder);

    await transporter.sendMail({
      from: `"דרך קצרה" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "תודה על הזמנתך",
      html: emailHtml,
    });

    await transporter.sendMail({
      from: `" דרך קצרה" <${process.env.GMAIL_USER}>`,
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

exports.updateOrder = async (req, res) => {
  try {
    const { orderCode } = req.params;
    const updateData = req.body;

    const existingOrder = await Orders.findOne({ orderCode });
    if (!existingOrder) {
      return res.status(404).json({ error: "ההזמנה לא נמצאה" });
    }

    const updatedOrder = await Orders.findOneAndUpdate(
      { orderCode },
      updateData,
      {
        new: true,
      }
    );

    if (
      updateData.status &&
      updateData.status !== existingOrder.status &&
      ["נשלחה", "הסתיימה"].includes(updateData.status)
    ) {
      const statusEmailHtml = generateStatusEmailHtml(
        updatedOrder.fullName,
        updateData.status,
        updatedOrder.orderCode
      );

      await transporter.sendMail({
        from: `"אתר דרך קצרה" <${process.env.GMAIL_USER}>`,
        to: updatedOrder.email,
        subject:
          updateData.status === "נשלחה"
            ? "ההזמנה שלך נשלחה"
            : "ההזמנה שלך סופקה",
        html: statusEmailHtml,
      });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("שגיאה בעדכון ההזמנה:", err.message);
    res.status(500).json({ error: "שגיאה בעדכון ההזמנה" });
  }
};
exports.confirmReceivedPage = async (req, res) => {
  try {
    const { orderCode } = req.params;
    const order = await Orders.findOne({ orderCode });

    if (!order) {
      return res.status(404).json({ error: "ההזמנה לא נמצאה" });
    }

    const alreadyConfirmed = order.status === "הסתיימה";

    if (!alreadyConfirmed) {
      order.status = "הסתיימה";
      await order.save();

      // שליחת מייל
      const statusEmailHtml = generateStatusEmailHtml(order.fullName, "הסתיימה", order.orderCode);
      await transporter.sendMail({
        from: `"אתר דרך קצרה" <${process.env.GMAIL_USER}>`,
        to: order.email,
        subject: "ההזמנה שלך סופקה",
        html: statusEmailHtml,
      });
    }

    res.json({
      alreadyConfirmed,
      fullName: order.fullName,
    });

  } catch (err) {
    console.error("שגיאה באישור ההזמנה:", err.message);
    res.status(500).json({ error: "שגיאה בשרת" });
  }
};

