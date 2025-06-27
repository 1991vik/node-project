import jwt from "jsonwebtoken";
import messageConstants from '../config/constant.js';
import { User } from "../models/Users.js";

const jwtSecretKey = process.env.JWT_SECRET;
const MESSAGE_CONSTANTS =  messageConstants();

async function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: MESSAGE_CONSTANTS.TOKEN_NOT_FOUND });
    }

    const token = authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : authHeader;
    
    if(!token) {
        res.status(401).json({message: MESSAGE_CONSTANTS.INVALID_TOKEN_FORMATE});
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        const activeUser = await User.findOne({
            attributes: ['id', 'active_token'],
            where: {
                id: decoded.userId,
                active_token: token
            }
        });
        
        if (!activeUser || activeUser.active_token != token) {
            return res.status(401).json({
                message: MESSAGE_CONSTANTS.INVALID_TOKEN
            });
        }
        next();
    } catch (err) {
        return res.status(401).json({messgae: MESSAGE_CONSTANTS.INVALID_TOKEN });
    }
}

export { verifyToken, jwt }