exports.index = (req, res) => {
    res.render('index');
}

//req.session.usuario = { nome: 'luis', logado: true } 
//req.flash('info', 'ola mundao', "ola cachorro")