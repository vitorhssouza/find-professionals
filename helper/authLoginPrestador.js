module.exports.checarLogadoCliente = function (req, res, next){
    const userId = req.session.userIdCliente;
    if(!userIdCliente){
        res.redirect('/login');
    }
    next();
}