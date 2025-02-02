class loginController{
    index(req, res){
        res.render('dangnhap', { showHeaderFooter: false });
    }
}
module.exports = new loginController;
