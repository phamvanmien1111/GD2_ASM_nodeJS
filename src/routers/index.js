const homeRouter = require('./homeRouter'); 
const AboutRouter = require('./about');
const postRouter = require('./apiRouter');
const loginRouter = require('./dangnhapRouter');
const logoutRouter = require('./dangkyRoute');
const profileRouter = require('./profileRouter');
function route(app) {
    // Redirect từ / đến /home
    app.get('/', (req, res) => {
        res.redirect('/home');
    });

    // Sử dụng các router
    app.use('/home', homeRouter); 
    // app.use('/post/products', productsRouter); 
    app.use('/profile', profileRouter);
    app.use('/dangnhap', loginRouter);
    app.use('/dangky', logoutRouter);
    app.use('/about', AboutRouter); 
    app.use('/api', postRouter);
}
module.exports = route;