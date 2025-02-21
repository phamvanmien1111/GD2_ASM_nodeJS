import db from '../../config/db.js';
class Profile{
    static async getProfile(userId){
        const [rows] = await db.query(`SELECT * FROM users WHERE UserID = ?`, [userId]);
        return rows[0];
    }
    static async getPost(userId) {
        const [rows] = await db.query(`
            SELECT p.*, u.Avatar, u.FirstName, u.LastName 
            FROM posts1 p
            JOIN users u ON p.UserID = u.UserID
            WHERE p.UserID = ?`, [userId]);
    
        console.log("🟢 Dữ liệu từ DB:", rows); // 🛠 In ra để kiểm tra
    
        return rows;
    }
    static async updateProfile(userId, name, email, phone, address) {
        await db.query(
            'UPDATE users SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
            [name, email, phone, address, userId]
        );
    }
    static async getProfileMe(userId) {
        const [rows] = await db.query(`SELECT * FROM users WHERE UserID = ?`, [userId]);
        return rows[0];
    }
    static async updateProfile(userId, updatedData) {
        try {
            const { Username, Email, phone, Location } = updatedData;
            const [result] = await db.execute(
                "UPDATE users SET Username=?, Email=?, phone=?, Location=? WHERE UserID=?",
                [Username, Email, phone, Location, userId]
            );

            return result.affectedRows > 0;
        } catch (error) {
            console.error("Lỗi cập nhật profile:", error);
            return false;
        }
    }
}

export default Profile;