// app.js

// לייבא את express (מערכת מסגרת ליצירת שרתים)
const express = require('express');
const app = express();

// הצגה פשוטה בעת ביקור בעמוד הראשי
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// הגדרת השרת לשמיעה על פורט 4000 (או פורט אחר שתרצה)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//123
