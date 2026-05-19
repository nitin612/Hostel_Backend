import Complain from "../models/ComplainModal.js";

export const createComplaint = async (req, res) => {
  console.log("📝 Incoming Complaint Request Body:", req.body);
  console.log("📁 Incoming Complaint Request File:", req.file);
  
  const { title, description } = req.body;
  const imageUrl = req.file ? req.file.path : "";

  if (!title || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const complain = new Complain({
      user: req.user.id,
      title,
      image: imageUrl,
      description,
    });

    await complain.save();
    res.status(201).json({
      message: "Complain submitted successfully!",
      requestDetails: complain,
    });
  } catch (error) {
    console.error("❌ Error in createComplaint:", error);
    res.status(500).json({ 
      message: "Internal Server Error", 
      error: error.message 
    });
  }
};

// User-scoped: returns only the logged-in user's complaints
export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complain.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ request: complaints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const request = await Complain.find({}).populate("user").sort({ createdAt: -1 });
    res.status(200).json({
      request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.body;
    const request = await Complain.findOneAndDelete(id);
    res.status(200).json({
      message: "Complain has been deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateComplainStatus = async (req, res) => {
    try {
      const { id, status } = req.body;
  
      // Update the status of the Complain document
      const updatedComplain = await Complain.findByIdAndUpdate(
        id,
        { status },
        { new: true } // return the updated document
      );
  
      if (!updatedComplain) {
        return res.status(404).json({ message: "Complain not found" });
      }
  
      res.status(200).json({
        message: "Complain status updated successfully",
        data: updatedComplain,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };