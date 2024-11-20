import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function getAccessToken(data) {
    const key = process.env.SECRET_KEY;
    const token = jwt.sign(data, key, { expiresIn: "7d" });
    return token;
}

export { getAccessToken };
