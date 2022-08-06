import {v1 as uuid} from 'uuid';
import {PateinsWithoutSensibilityData, NewPatient, Patient} from '../types';
import patientsData from '../data/patients.json';

const patients: PateinsWithoutSensibilityData[] = patientsData as PateinsWithoutSensibilityData[];

const getAllPatients = (): PateinsWithoutSensibilityData[] => {
   return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    };
   });
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient: Patient  = {
    // eslint-disable-next-line 
        id: uuid(),
        ...patient
    };
    return newPatient;
};


export default {getAllPatients, addPatient};