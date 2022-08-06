import {  NewPatient } from "./types";
import { Gender } from "./enums";

const isString = (string: any): boolean => {
    return typeof string === 'string' || string instanceof String;
};

const isDate = (date: any): boolean => {
    // eslint-disable-next-line 
    return Boolean(Date.parse(date));
};

const isGender = (gender: any): boolean => {
    // eslint-disable-next-line 
    return Object.values(Gender).includes(gender);
};


const parseName = (name : any): string => {
    if(!isString(name)) throw new Error('Incorrect or missing name');
    // eslint-disable-next-line 
    return name;
};

const parseDateOfBirth = (date: any): string => {
    if(!isString(date) || !isDate(date)) throw new Error('Incorrect or missing date');
    // eslint-disable-next-line 
    return date;
};

const parseGender = (gender: any) => {
    if(!isString(gender) || !isGender(gender)) throw new Error('Incorrect or missing gender');
    // eslint-disable-next-line 
    return gender;
};

const parseOccupation = (occupation: any) : string => {
    if(!isString(occupation)) throw new Error('Incorrect or missing occupation');
    // eslint-disable-next-line 
    return occupation
};
const parseSSN = (ssn: any): string => {
    if(!isString(ssn)) throw new Error('Incorrect or missing ssn');
    // eslint-disable-next-line 
    return ssn;
};

const toNewPatient = (obj: any): NewPatient => {
    const newPatient: NewPatient = {
       name: parseName(obj.name),
       dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
        // eslint-disable-next-line 
       gender: parseGender(obj.gender),
       ssn: parseSSN(obj.ssn),
       occupation: parseOccupation(obj.occupation)
    };

    return newPatient;
};


export default toNewPatient;