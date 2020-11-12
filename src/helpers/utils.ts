export const validateName = (value: string) => {
    return /^[A-Za-z\s-]+$/.test(value);
};

export const validateSurname = (value: string) => {
    return /^[A-Za-z\s-]+$/.test(value);
};

export const validatePosition = (value: string) => {
    return /^[A-Za-z\s-]+$/.test(value);
};

export const validateDateOfBirth = (value: string) => {
    return /^\d{1,2}-\d{1,2}-\d{4}$/.test(value);
};

export const validatePhoneNumber = (value: string) => {
    return /^[\d+-]+$/.test(value);
};
