import { Gender } from './enums';
interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export type Diagnoses = Array<Diagnose>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {

}


 interface Patient {
   id: string,
   name: string,
   dateOfBirth: string,
   ssn: string,
   gender: Gender,
   occupation: string,
   entries: Entry[]
}


 export type PateinsWithoutSensibilityData = Omit<Patient, 'ssn' | 'entries'>;

 export type NewPatient = Omit<Patient, 'id'>;

