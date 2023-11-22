const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    const contatos = await Contato.buscaContatos();
    res.render('index', { contatos });
}



//req.session.usuario = { nome: 'luis', logado: true } 
//req.flash('info', 'ola mundao', "ola cachorro")