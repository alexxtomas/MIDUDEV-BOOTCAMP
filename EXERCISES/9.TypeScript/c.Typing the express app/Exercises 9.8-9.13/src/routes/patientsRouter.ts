import express from 'express';
import patientsServices from '../services/patientsServices';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsServices.getAllPatients();
    res.json(patients);
});

router.post('/', (req, res) => {
    try {
      const newPatient = toNewPatient(req.body);

      const addedPatient = patientsServices.addPatient(newPatient);
      res.json(addedPatient);

    } catch(e: any) {
        res.status(400).send(e.message);
    }
});

router.get('/:id', (req, res) => {
    console.log('a');
    try {
        const patient =  patientsServices.getPatientById(req.params.id);
        res.json(patient);
    } catch(e: any) {
        res.status(400).send(e.message);
    }
});



export default router;