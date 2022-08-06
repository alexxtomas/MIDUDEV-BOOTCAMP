
interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export type Diagnoses = Array<Diagnose>;


type Gender = 'male' | 'female' | 'other';

interface Pateint{
   id: string,
   name: string,
   dateOfBirth: string,
   ssn: string,
   gender: Gender,
   occupation: string
}


 export type PateinsWithoutSensibilityData = Omit<Pateint, 'ssn'>;

