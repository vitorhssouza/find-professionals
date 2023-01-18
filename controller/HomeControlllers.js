const bcrypt = require('bcryptjs');

class HomeController{
    static home(req, res){
        res.render('home')
    }



}

module.exports = HomeController
