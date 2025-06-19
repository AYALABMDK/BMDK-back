require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.loginAdmin = (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // רק בפרודקשן
      sameSite: 'Lax',
      maxAge: 2 * 60 * 60 * 1000, // שעתיים
    });
    return res.status(200).json({ message: 'Logged in' });
  } 

    return res.status(401).json({ message: 'שם משתמש או סיסמה שגויים' });
  
};

