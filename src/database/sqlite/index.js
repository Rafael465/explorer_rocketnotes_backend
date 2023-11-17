// index.js padrão do SQLite

const sqlite3 = require("sqlite3"); //import do SQLite
const sqlite = require("sqlite");
const path = require("path");

async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), // para visualizar o database.bd, utilizar SGBD - Sistema Gerenciador de Banco de Dados
        driver: sqlite3.Database
    });

    return database;
}


module.exports = sqliteConnection; 