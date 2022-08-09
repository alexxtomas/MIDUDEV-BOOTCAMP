import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import PateintDetails from "./components/PatientDetails";
import PatientsList from "./components/PatientsList";
import { setPatients } from "./state/reducer";
import { useStateValue } from "./state/state";
import { Patient } from "./types";

const App = () => {
  const [, dispatch] = useStateValue()
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const {data: patientsFromApi} = await axios.get<Patient[]>('http://localhost:3001/api/patients')
        dispatch(setPatients(patientsFromApi))
      } catch (err) {
        console.error(err)
      }
    }
    fetchPatients()
  }, [dispatch])

  
  return (
      <Container maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom  color="darkcyan">Patientor</Typography>
        <Routes>
          <Route path="/" element={<PatientsList />} />
          <Route path="/patients/:id" element={<PateintDetails />} />
        </Routes>
      </Container>
   
  );
}

export default App;
