import express from 'express';
import patientsServices from '../services/patientsServices';

const router = express.Router();

router.get('/', (_req, res) => {
    const patients = patientsServices.getAllPatients();
    res.json(patients);
});



export default router;