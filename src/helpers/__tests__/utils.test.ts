import { validateDateOfBirth, validateName, validatePhoneNumber, validatePosition, validateSurname } from "../utils";

describe("Validations", () => {
    describe("Validate name", () => {
        it("validateName should return true if name is valid", () => {
            expect(validateName("test name")).toBeTruthy();
        });
        it("validateName should return true if name has digit", () => {
            expect(validateName("test name 2")).toBeFalsy();
        });
        it("validateName should return true if name has symbol", () => {
            expect(validateName("test, name ")).toBeFalsy();
        });
    });
    describe("Validate surname", () => {
        it("validateSurname should return true if surname is valid", () => {
            expect(validateSurname("test surname")).toBeTruthy();
        });
        it("validateSurname should return true if surname has digit", () => {
            expect(validateSurname("test surname 2")).toBeFalsy();
        });
        it("validateSurname should return true if surname has symbol", () => {
            expect(validateSurname("test, surname ")).toBeFalsy();
        });
    });
    describe("Validate position", () => {
        it("validatePosition should return true if position is valid", () => {
            expect(validatePosition("test position")).toBeTruthy();
        });
        it("validatePosition should return true if position has digits", () => {
            expect(validatePosition("test position 2")).toBeFalsy();
        });
        it("validatePosition should return true if position has symbol", () => {
            expect(validatePosition("test, position ")).toBeFalsy();
        });
    });
    describe("Validate date of birth", () => {
        it("validateDateOfBirth should return true if dateOfBirth is valid", () => {
            expect(validateDateOfBirth("23-09-1993")).toBeTruthy();
        });
        it("validateDateOfBirth should return true if dateOfBirth is invalid", () => {
            expect(validateDateOfBirth("23091993")).toBeFalsy();
            expect(validateDateOfBirth("23 09 1993")).toBeFalsy();
            expect(validateDateOfBirth("1993-09-23")).toBeFalsy();
            expect(validateDateOfBirth("1993 09 23")).toBeFalsy();
        });
    });
    describe("Validate phone number", () => {
        it("validatePhoneNumber should return true if phoneNumber is valid", () => {
            expect(validatePhoneNumber("+994510123213")).toBeTruthy();
        });
        it("validatePhoneNumber should return true if phoneNumber is invalid", () => {
            expect(validateDateOfBirth("9945123213a")).toBeFalsy();
        });
    });
});
