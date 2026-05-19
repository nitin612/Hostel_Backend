import Rule from "../models/rulesModel.js";

// Retrieve the current drafted hostel rules
export const getHostelRules = async (req, res) => {
  try {
    const rulesDoc = await Rule.findOne().sort({ updatedAt: -1 });
    res.status(200).json({
      content: rulesDoc ? rulesDoc.content : "",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update/Draft new hostel rules
export const updateHostelRules = async (req, res) => {
  const { content } = req.body;

  if (content === undefined) {
    return res.status(400).json({ message: "Content is required." });
  }

  try {
    // Find the latest document or create a new one
    let rulesDoc = await Rule.findOne();
    if (rulesDoc) {
      rulesDoc.content = content;
      await rulesDoc.save();
    } else {
      rulesDoc = new Rule({ content });
      await rulesDoc.save();
    }

    res.status(200).json({
      message: "Hostel rules updated successfully!",
      rules: rulesDoc,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
