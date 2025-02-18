
import express from 'express';
import cors from "cors";
import { PORT } from './config/config.js';
import { sequelize } from "./db/conexion.js";
 import productrouter from './router/ProductRouter.js'
 import localRoutes from "./router/LocalRouter.js";

// imaganes
import path from 'path';
import { fileURLToPath } from 'url';


const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', productrouter);
app.use("/api", localRoutes);


const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false      })
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
}
main();

