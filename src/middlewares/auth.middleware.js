import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function authMiddleware(req, res, next) {
    const token = req.cookies;
    try {
        const decoded = jwt.verify(token.access_token, process.env.SECRET_KEY);
        req.body = { ...req.body, _id: decoded._id };
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}

export { authMiddleware };
