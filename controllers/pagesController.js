const Page = require("../models/Page");

exports.getPageByKey = async (req, res) => {
  try {
    const page = await Page.findOne({ key: req.params.key });
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePage = async (req, res) => {
  try {
    const updatedPage = await Page.findOneAndUpdate(
      { key: req.params.key },
      { $set: req.body },
      { new: true }
    );
    if (!updatedPage) return res.status(404).json({ message: "Page not found" });
    res.json(updatedPage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
