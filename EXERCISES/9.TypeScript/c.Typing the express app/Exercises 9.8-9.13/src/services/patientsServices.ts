import { v1 as uuid } from 'uuid';
import patientsData from '../data/patients.json';
import { NewPatient, /*PateinsWithoutSensibilityData*/ Patient } from '../types';

// const patients: PateinsWithoutSensibilityData[] = patientsData as PateinsWithoutSensibilityData[];
const fullInfoPatients: Patient[] = patientsData as Patient[];

// const getAllPatients = (): PateinsWithoutSensibilityData[] => {
//    return patients.map(({id, name, dateOfBirth, gender, occupation}) => {
//     return {
//         id,
//         name,
//         dateOfBirth,
//         gender,
//         occupation
//     };
//    });
// };

const getAllPatients = (): Patient[] => {
    return fullInfoPatients;
 };

const addPatient = (patient: NewPatient): Patient => {
    const newPatient: Patient  = {
    // eslint-disable-next-line 
        id: uuid(),
        ...patient
    };
    return newPatient;
};

const getPatientById = (id: string): Patient => {
   const patient = fullInfoPatients.find(p => p.id === id);
   if(!patient) throw new Error('There is no patient with this id');
   return patient;
};


export default {getAllPatients, addPatient, getPatientById};