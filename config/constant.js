function messageConstants() {
    const MISSING_REGISTRATION_FIELDS = "Missing required fields.";
    const INVALID_USERNAME = "Username should be 'myusername123'.";
    const INVALID_PASSWORD = "Password should be strong.";
    const EMAIL_ALREADY_PRESENT = "The email is already regester.";

    return { 
                MISSING_REGISTRATION_FIELDS,
                INVALID_USERNAME,
                INVALID_PASSWORD,
                EMAIL_ALREADY_PRESENT 
            }
}

export default messageConstants;