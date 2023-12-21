"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (dateOfBirth) => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Incorrect or missing dateOfBirth");
    }
    return dateOfBirth;
};
const isSsn = (ssn) => {
    return (ssn.length === 11 &&
        ssn.substring(6, 7) === "-" &&
        ssn.substring(0, 6).match(/^[a-z0-9]+$/) !== null &&
        ssn.substring(7, 11).match(/^[a-z0-9]+$/) !== null);
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((g) => g.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing name");
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect or missing data");
    }
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
        };
        return newPatient;
    }
    else {
        throw new Error("Incorrect or missing data");
    }
};
exports.default = toNewPatientEntry;
