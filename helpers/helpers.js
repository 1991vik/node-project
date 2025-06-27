function isValidUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  }

function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++; // Minimum length
    if (/[A-Z]/.test(password)) strength++; // Uppercase letter
    if (/[a-z]/.test(password)) strength++; // Lowercase letter
    if (/\d/.test(password)) strength++; // Number
    if (/[!@#$%^&*()]/.test(password)) strength++; // Special character

    if (strength === 8) return true;
    if (strength >= 5) return true;
    return false;
}

const checkExistence = async (columnName, value, Table) => {
    try { 
        const result = await Table.findAll({
        attributes: ['id'], 
        where: {
            [columnName]: value,
        },
      });
      return result;
    }  catch (error) {
        console.error('Error checking existence:', error);
        throw error;
    }
    
}
export { checkPasswordStrength, isValidUsername, checkExistence };
