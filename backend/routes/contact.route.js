import express from "express";
import { submitContactForm } from "../controllers/contact.controller.js";

const contactRoutes = express.Router();

contactRoutes.post("/contact", submitContactForm);

export default contactRoutes;
