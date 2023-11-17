require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations")
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const cors = require("cors");
const express = require("express"); // import puxando todas as funcionalidades da pasta "express" e colocando na minha contante "express"
const routes = require("./routes")

migrationsRun();

const app = express(); // inicializando o express
app.use(cors());
app.use(express.json()); // comunicar que estou utilizando "json" para conseguir obter os dados no "POST" do insomnia

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));

app.use(routes);

app.use(( error, request, response, next ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }

    console.error(error);

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});

const PORT = process.env.PORT || 3333; // porta/endereço das requisições/porta onde a API vai observar
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); //app, ouça na PORT, qual o seu endereço

// para checar o funcionamento digite "node src/server.js" no terminal
// adicionado script no "package.json". Agora digite apenas "npm start" para realizar o comando acima   