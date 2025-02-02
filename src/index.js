// const express = require('express');
// const exphbs = require('express-handlebars');
// const path = require('path');
// const morgan = require('morgan');
// const app = express();
// const port = 3000;
// const routers = require('./routers');
// // Cấu hình Handlebars
// app.engine('hbs', exphbs.engine({
//     defaultLayout: 'main',
//     layoutsDir: path.join(__dirname, 'resources/views/layouts'),
//     partialsDir: path.join(__dirname, 'resources/views/partials'),
//     extname: '.hbs' 
// }));
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources/views'));

// // // Middleware để phục vụ các tệp tĩnh
// // app.use(express.static(path.join(__dirname, 'src/public')));

// // Routing chạy các trang request và response


// routers(app);
// // app.get('/', (req, res) => {
// //     res.redirect('/home');
// // });

// // app.get('/home', (req, res) => {
// //     res.render('home', { title: 'Home' });
// // });

// // app.get('/products', () => {
   
// // });

// // app.get('/careers', (req, res) => {
// //     res.render('careers', { title: 'Careers' });
// // });

// // app.get('/about', (req, res) => {
// //     res.render('about', { title: 'About Us' });
// // });

// // chạy sever
// app.listen(port, () => {
//     console.log(`App running at http://localhost:${port}`);
// });
// src/index.js
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 3000;

// Middleware để ghi log các yêu cầu HTTP
app.use(morgan('dev'));

// Cấu hình Handlebars
app.engine('hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'resources/views/layouts'),
    partialsDir: path.join(__dirname, 'resources/views/partials'),
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Middleware để phục vụ các tệp tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng router
const route = require('./routers');
route(app);

// Khởi động server
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});