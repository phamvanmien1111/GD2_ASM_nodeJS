class profileController{
    //GET /products
    index(req, res){
        // res.render('dangnhap', { title: 'login' });
        res.render('profile', { showHeaderFooter: true });
    }
}
module.exports = new profileController;
