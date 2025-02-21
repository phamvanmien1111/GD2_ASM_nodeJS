class AboutController {
    // GET /products
    index(req, res) {
        res.render('about', { title: 'About Us' });
    }
}

export default new AboutController();
