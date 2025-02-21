import express from 'express';
import homeRouter from './homeRouter.js';
import AboutRouter from './about.js';
import loginRouter from './dangnhapRouter.js';
import logoutRouter from './dangkyRoute.js';
import profileRouter from './profileRouter.js';
import homeController from '../app/controllers/homeController.js';
import profileMe from './profileMeRouter.js';
const router = express.Router();

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
    app.use('/profileMe', profileMe);
    app.get('/search', homeController.searchPosts);
}

export default route;
