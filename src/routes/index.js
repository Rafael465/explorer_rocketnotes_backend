// index.js tem a função de reunir todas as rotas da minha aplicação

const { Router } = require("express");

const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes");
const sessionsRoutes = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRoutes); // toda vez qua alguém acessar o "/users", vai ser redirecionado para o "usersRoutes", que é o grupo de rotas do usuário.
routes.use("/sessions", sessionsRoutes);
routes.use("/notes", notesRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;