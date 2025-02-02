class productController{
    //GET /products
    index(req, res){
        res.render('products', { title: 'Products' });
    }
}
module.exports = new productController;
