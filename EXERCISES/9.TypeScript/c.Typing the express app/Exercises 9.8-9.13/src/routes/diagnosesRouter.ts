import express from 'express';
import diagnosesServices from '../services/diagnosesServices';

const router = express.Router();

router.get('/', (_req, res) => {
    const diagnoses =  diagnosesServices.getAllDiagnoses();

    res.send(diagnoses);
});



export default router;