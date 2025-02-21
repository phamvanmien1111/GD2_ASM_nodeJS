import express from 'express';
import exphbs from 'express-handlebars';
import path from 'path';
import morgan from 'morgan';
import session from 'express-session';
import { fileURLToPath } from 'url';
import route from './routers/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware để ghi log các yêu cầu HTTP
app.use(morgan('dev'));

// Middleware xử lý dữ liệu gửi từ form
app.use(express.json()); // Xử lý dữ liệu dạng JSON
app.use(express.urlencoded({ extended: true })); // Xử lý dữ liệu form (application/x-www-form-urlencoded)

// Middleware để lưu thông tin người dùng sau khi đăng nhập
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

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

// Import & sử dụng router (phải đặt **sau** middleware xử lý form)
route(app);

// Khởi động server
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});

export default app;
