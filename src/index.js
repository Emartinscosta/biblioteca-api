import "dotenv/config";
import express from "express";
import cors from "cors";
import livrosRoutes from "./routes/livrosRoute.js";
import authenticate from "./database/connection.js";
import verificarAdm from "./middleware/adminMiddleware.js";

authenticate();

const servidor = express();

servidor.use(cors({ origin: "*"}));

servidor.use(express.json());

servidor.use(livrosRoutes);

servidor.get("/admin", verificarAdm, (req, res) => {
    res.json({
        mensagem: "Acesso administrativo."
    });
});

servidor.listen(3000, () => {
    console.log("Servidor em Execução");
});

//endpoint
// Rest (Paradgma) - Transferencia de Estado Representacional
// Restful - API REST
// API -> Interface de Programação de Aplicativos (Canal para gerenciar dados)
// API -> (GET, POST, PUT, DELETE) Formato Json
// RESTFul - API REST
