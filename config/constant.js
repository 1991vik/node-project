function messageConstants() {
    const MISSING_REGISTRATION_FIELDS = "Missing required fields.";
    const INVALID_USERNAME = "Username should be 'myusername123'.";
    const INVALID_PASSWORD = "Password should be strong.";
    const EMAIL_ALREADY_PRESENT = "The email is already regester.";
    const USERNAME_ALREADY_PRESENT = "Username already exists.";
    const REGESTRATION_SUCCESS = "Registration successfully completed.";
    const USER_NOT_FOUND = "User not found.";
    const PASSWORD_NOT_MATCH = "You have entered wrong password.";
    const LOGIN_SUCCESS = "User successfully logged in.";
    const INVALID_CREDENTIALS = "Invalid credentials.";
    const INVALID_TOKEN = "Invalid Token";

    return { 
                MISSING_REGISTRATION_FIELDS,
                INVALID_USERNAME,
                INVALID_PASSWORD,
                EMAIL_ALREADY_PRESENT,
                USERNAME_ALREADY_PRESENT,
                REGESTRATION_SUCCESS,
                USER_NOT_FOUND,
                PASSWORD_NOT_MATCH,
                LOGIN_SUCCESS,
                INVALID_CREDENTIALS,
                INVALID_TOKEN
            }
}

export default messageConstants;