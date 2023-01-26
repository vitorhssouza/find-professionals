module.exports.checarLogadoPrestador = function (req, res, next){
    const userIdPrestador = req.session.userIdPrestador;
    if(!userIdPrestador){
        res.redirect('/login');
    }else{
        next();
    }
    
}