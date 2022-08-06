import {Gender} from './enums';
interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export type Diagnoses = Array<Diagnose>;




 interface Patient{
   id: string,
   name: string,
   dateOfBirth: string,
   ssn: string,
   gender: Gender,
   occupation: string
}


 export type PateinsWithoutSensibilityData = Omit<Patient, 'ssn'>;

 export type NewPatient = Omit<Patient, 'id'>;

