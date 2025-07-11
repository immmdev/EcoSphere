import express from "express";
import { submitContactForm, getAllContacts } from "../controllers/contact.controller.js";
import adminAuth from "../middlewares/adminAuth.js"

const contactRoutes = express.Router();

// for users
contactRoutes.post("/contact", submitContactForm);

// for admin
contactRoutes.get("/get-contacts", adminAuth, getAllContacts);

export default contactRoutes;
