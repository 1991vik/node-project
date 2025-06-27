import jwt from "jsonwebtoken";
import messageConstants from '../config/constant.js';

const jwtSecretKey = process.env.JWT_SECRET;
const MESSAGE_CONSTANTS =  messageConstants();

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], jwtSecretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).send(MESSAGE_CONSTANTS.INVALID_TOKEN);
    }
}

export { verifyToken, jwt }