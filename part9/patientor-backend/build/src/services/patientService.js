"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const getEntries = () => {
    return patients_1.default;
};
const getNonSentitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (patient) => {
    const newID = Math.max(...patients_1.default.map((p) => p.id)) + 1;
    console.log(newID);
    const newPatient = Object.assign({ id: newID }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    getNonSentitiveEntries,
    addPatient,
};
