import express from 'express';

import { createLocal } from "../controller/LocalController.js";

const router = express.Router();

// Ruta para crear un local
router.post("/crearLocal", createLocal);

export default router;