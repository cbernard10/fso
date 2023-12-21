/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  NewPatient,
  Gender,
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error("Incorrect or missing dateOfBirth");
  }
  return dateOfBirth;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const isSsn = (ssn: string): boolean => {
  return Boolean(ssn.length === 11 || (ssn.length === 10 && ssn[6] === "-"));
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing name");
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

const parseType = (type: unknown): string => {
  if (!type || !isString(type)) {
    throw new Error("Incorrect or missing type");
  }
  return type;
};

const parseNumber = (param: unknown): number => {
  if (!param || typeof param !== "number") {
    throw new Error("Incorrect or missing data");
  }
  return param;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing data");
  }
  return param;
};

const parseDischarge = (
  object: unknown
): { date: string; criteria: string } => {
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object && "criteria" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  return {
    date: parseDate(object.date),
    criteria: parseString(object.criteria),
  };
};

const parseSickLeave = (
  object: unknown
): { startDate: string; endDate: string } => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object && "endDate" in object)
  ) {
    throw new Error("Incorrect or missing data");
  }

  return {
    startDate: parseDate(object.startDate),
    endDate: parseDate(object.endDate),
  };
};

const parseHealthCheckRating = (param: unknown): number => {
  if (!param || typeof param !== "number") {
    throw new Error("Incorrect or missing data");
  }
  return param;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    const newType = parseType(object.type);
    switch (newType) {
      case "HealthCheck":
        if (!("healthCheckRating" in object)) {
          throw new Error("Incorrect or missing health check data");
        }
        if (
          parseHealthCheckRating(object.healthCheckRating) < 0 ||
          parseHealthCheckRating(object.healthCheckRating) > 3
        ) {
          throw new Error(
            `Incorrect healthCheckRating ${object.healthCheckRating}`
          );
        }
        const newHealthCheckEntry: EntryWithoutId = {
          description: parseString(object.description),
          date: parseDate(object.date),
          specialist: parseString(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: newType,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
        return newHealthCheckEntry;
      case "Hospital":
        if (!("discharge" in object)) {
          throw new Error("Incorrect or missing hospital data");
        }
        const newHospitalEntry: EntryWithoutId = {
          description: parseString(object.description),
          date: parseDate(object.date),
          specialist: parseString(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: newType,
          discharge: parseDischarge(object.discharge),
        };
        return newHospitalEntry;
      case "OccupationalHealthcare":
        if (!("employerName" in object)) {
          throw new Error("Incorrect or missing occupational healthcare data");
        }
        const newOccupationalHealthcareEntry: EntryWithoutId = {
          description: parseString(object.description),
          date: parseDate(object.date),
          specialist: parseString(object.specialist),
          diagnosisCodes: parseDiagnosisCodes(object),
          type: newType,
          employerName: parseString(object.employerName),
        };
        if ("sickLeave" in object) {
          newOccupationalHealthcareEntry.sickLeave = parseSickLeave(
            object.sickLeave
          );
        }
        return newOccupationalHealthcareEntry;
      default:
        throw new Error("Incorrect or missing data");
    }
  } else {
    throw new Error("Incorrect or missing data");
  }
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatient = {
      entries: [],
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };
    return newPatient;
  } else {
    throw new Error("Incorrect or missing data");
  }
};

export default toNewPatientEntry;
