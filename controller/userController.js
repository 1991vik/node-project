import { checkPasswordStrength, isValidUsername, checkExistence } from '../helpers/helpers.js';
import messageConstants from '../config/constant.js';
import User from '../models/Users.js';

const MESSAGE_CONSTANTS =  messageConstants();

export const userRegestration = async (req, res) => {
    let response = { 'success':true }

    if(req.body) {
        let userName = req.body.username;
        let userEmail = req.body.email;
        let userPassword = req.body.password;
        let errorStatus = true;
        
        if(!userName || !userEmail || !userPassword) {
            response = {"status": 400, "error": MESSAGE_CONSTANTS.MISSING_REGISTRATION_FIELDS, "success": false}
        }

        if(errorStatus && isValidUsername(userName) === false) {
            response = {"status": 400, "error": MESSAGE_CONSTANTS.INVALID_USERNAME, "success": false}
            errorStatus = false;
        }

        if(errorStatus && checkPasswordStrength(userPassword) === false) {
            response = {"status": 400, "error": MESSAGE_CONSTANTS.INVALID_PASSWORD, "success": false}
        }

        const result = await checkExistence('email', userEmail, User);
        if(result.length > 0) {
            response = {"status": 400, "error": MESSAGE_CONSTANTS.EMAIL_ALREADY_PRESENT, "success": false}
        }
        //response = {"success": true}
    }
    res.json(response);
}

export const userLogin = (req, res) => {
    res.json({'success': true});
}
