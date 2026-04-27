import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@techlab.com" && password === "123456") {
        const token = jwt.sign(
            { email }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Login successful",
            token: token
        });
    }

    res.status(401).json({ message: "Invalid credentials" });
};
