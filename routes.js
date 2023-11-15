const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');

/*teoria
function middleware(req, res, next) {
    //fazer algo aqui antes de enviar a resposta
    //só ira proseguir o caminho das rotas se chamar a função next
    //next();
}
rotas de caminho do cliente*/

//rotas da home
route.get('/',  homeController.index);


//rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);

module.exports = route;