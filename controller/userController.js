import { checkPasswordStrength, isValidUsername, checkExistence } from '../helpers/helpers.js';
import messageConstants from '../config/constant.js';
import { User, Op } from '../models/Users.js';
import bcrypt from 'bcrypt';
import { verifyToken, jwt } from '../middlewares/middlewares.js';


const MESSAGE_CONSTANTS =  messageConstants();
const jwtSecretKey = process.env.JWT_SECRET;

export const userRegestration = async (req, res) => {
    let response = { "status": 200, "success": true }
    let errorStatus = true;
    
    if(!req.body || !userName || !userEmail || !userPassword || !firstName || !lastName) {
        response = { "status": 403, "error": MESSAGE_CONSTANTS.MISSING_REGISTRATION_FIELDS, "success": false }
        errorStatus = false;
        return res.json(response);
    }
    let firstName = req.body.first_name;
    let lastName = req.body.last_name;
    let userName = req.body.username;
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    if(errorStatus && isValidUsername(userName) === false) {
        response = { "status": 401, "error": MESSAGE_CONSTANTS.INVALID_USERNAME, "success": false }
        errorStatus = false;
    }

    if(errorStatus && checkPasswordStrength(userPassword) === false) {
        response = { "status": 401, "error": MESSAGE_CONSTANTS.INVALID_PASSWORD, "success": false }
        errorStatus = false;
    }

    if(errorStatus) {
        const emailResult = await checkExistence('email', userEmail, User);
        const UserNameResult = await checkExistence('user_name', userName, User);

        if(emailResult.length > 0) {
            response = { "status": 400, "error": MESSAGE_CONSTANTS.EMAIL_ALREADY_PRESENT, "success": false }
        }
        else if(UserNameResult.length > 0) {
            response = { "status": 400, "error": MESSAGE_CONSTANTS.USERNAME_ALREADY_PRESENT, "success": false }
        } else {
            let bcryptPassword = await bcrypt.hash(userPassword, 10);
            try {
                await User.create({
                    first_name: firstName,
                    last_name: lastName,
                    user_name: userName,
                    email: userEmail,
                    password: bcryptPassword
                });
                response = { 
                        "status": 200,
                        "success": false, 
                        "message": MESSAGE_CONSTANTS.REGESTRATION_SUCCESS 
                    }
            } catch (error) {
                response = { "status": 500, "error": error, "success": false }
            }
        }
    }
    
    return res.json(response);
}

export const userLogin = async (req, res) => {
    let response = { "status": 200, "success": true }
    let errorStatus = true;
    
    if(!req.body || !req.body.username || !req.body.password) {
        response = { "status": 403, "error": MESSAGE_CONSTANTS.MISSING_REGISTRATION_FIELDS, "success": false }
        errorStatus = false;
        return res.json(response);
    }

    let userName = req.body.username;
    let userPassword = req.body.password;

    if(errorStatus) {
        let user =  await User.findOne({
            attributes: ['id', 'user_name', 'password', 'role_id'],
            where: { 
                    [Op.and]: [
                        {
                            [Op.or]: [
                                { email: userName },
                                { user_name: userName }
                            ]
                        },
                        { status: '1' }
                    ]
                } 
            });
            
        if(!user) {
            response = { "status": 400, "error": MESSAGE_CONSTANTS.USER_NOT_FOUND, "success": false }
            errorStatus = false;
            return res.json(response);
        }

        if(errorStatus && user) {
            const isMatch = await bcrypt.compare(userPassword, user.password);
            if (!isMatch) {
                response = { "status": 400, "error": MESSAGE_CONSTANTS.PASSWORD_NOT_MATCH, "success": false }
                errorStatus = false;
                return res.json(response);
            }
        }

        if (errorStatus) {
            const payload = {
                userId: user.id,
                username: user.user_name,
                role_id: user.role_id
            };
            const token = jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
            response = { "success": true, "status": 200, "message": MESSAGE_CONSTANTS.LOGIN_SUCCESS, "data": {"token":token} }
        } else {
            response = { "success": true, "status": 401, "message": MESSAGE_CONSTANTS.INVALID_CREDENTIALS }
        }
    }
    return res.json(response);
}
