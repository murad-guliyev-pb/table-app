export const validateName = (value: string): boolean => {
    return /^[A-Za-z\s-]+$/.test(value);
};

export const validateSurname = (value: string): boolean => {
    return /^[A-Za-z\s-]+$/.test(value);
};

export const validatePosition = (value: string): boolean => {
    return /^[A-Za-z\s-]+$/.test(value);
};

export const validateDateOfBirth = (value: string): boolean => {
    return /^\d{1,2}-\d{1,2}-\d{4}$/.test(value);
};

export const validatePhoneNumber = (value: string): boolean => {
    return /^[\d +-]+$/.test(value);
};
