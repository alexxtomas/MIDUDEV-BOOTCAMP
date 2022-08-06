import {PateinsWithoutSensibilityData} from '../types';
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


export default {getAllPatients};