const checkIsPhoneNumberIsValid = (phoneNumber) => {
    const validPrefixes = ["05", "06", "07"];
    const isValidPrefix = validPrefixes.some(prefix => phoneNumber.startsWith(prefix));
    const isValidLength = phoneNumber.length === 10;

    if (!isValidPrefix) return { message: "Phone number must start with 05, 06, 07" };
    if (!isValidLength) return { message: "Phone number must be 10 digits" };

    return phoneNumber;
};


module.exports = {
    checkIsPhoneNumberIsValid
};