import Contact from "../models/contact.model.js";

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    return res.status(200).json({ success: true, message: "Message received. We’ll get back to you soon!" });
  } catch (error) {
    console.error("Error saving contact form:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
