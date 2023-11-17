/*app.get("/message/:id/:user", (request, response) => {            // obrigatório o uso dos parâmetros
    const { id, user } = request.params;                          // desestruturação do comando abaixo, pois estou utilizando "request.params" de "id" e "user".

    response.send(`
    Mensagem ID: ${id}.
    Nome do Usuário: ${user}.
    `);
});*/

/*app.get("/users", (request, response) => { // funciona sem o page e sem o limit
    const { page, limit} = request.query;

    response.send(`Página: ${page}. Mostrar: ${limit}.`)
});*/

// Os parâmetros acima posso utilizar no localhost:3333 através do navegador

const { Router } = require("express"); // importação de "Router"
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// INSOMNIA
usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);

module.exports = usersRoutes; // exportando "usersRoutes"