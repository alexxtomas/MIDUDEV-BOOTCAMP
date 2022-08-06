import diagnosesData from '../data/diagnoses.json';
import { Diagnoses } from '../types';

const diagnoses = diagnosesData as Diagnoses;

const getAllDiagnoses = (): Diagnoses => {
    return diagnoses;
};



export default {getAllDiagnoses};