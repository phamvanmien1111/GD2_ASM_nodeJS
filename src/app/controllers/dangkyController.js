class DangKyController{
    //GET /products
    index(req, res){
        // res.render('dangnhap', { title: 'login' });
        res.render('dangky', { showHeaderFooter: false });
    }
}
module.exports = new DangKyController;
