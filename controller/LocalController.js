import { LocalModel } from "../models/LocalModel.js";

export const createLocal = async (req, res) => {
    try {
      const { nombre, duenio, latitud, longitud } = req.body;
  
      // Verificar si todos los campos requeridos están presentes
      if (!nombre || !duenio || !latitud || !longitud) {
        return res.status(400).json({ message: "Todos los campos obligatorios deben ser completados" });
      }
  
      // Crear el local en la base de datos
      const local = await LocalModel.create({
        nombre,
        duenio,
        latitud,
        longitud
      });
  
      res.status(201).json({ message: "Local creado exitosamente", local: { id: local.id } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
