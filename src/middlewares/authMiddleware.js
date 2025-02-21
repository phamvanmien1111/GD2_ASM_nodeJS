export default function authMiddleware(req, res, next) {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
    }
    next(); // Cho phép request tiếp tục
}
