import { Button, Table, TableBody, TableContainer, TableRow, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Patient } from "../types";

const PateintDetails = () => {

    const [patient, setPatient] = useState<Patient>()
    const {id} = useParams<{id: string}>()
    let navigate = useNavigate()

    if(patient?.id !== id) {
       
    }
    useEffect(() => {
        const fetchPatientById = async(id: string | undefined) => {
            try {
              const {data: patientFromApi} = await axios.get<Patient>(`http://localhost:3001/api/patients/${id}`)
              setPatient(patientFromApi)


            }catch(e) {
              console.error(e)
            }
        }
        if(patient?.id !== id) fetchPatientById(id)
    }, [id, patient?.id])
   const handleClick = () => {
    navigate('/')
   }
   
    return (
        <div>
            <Button color="primary" variant="contained" onClick={handleClick}>Home</Button>
            <Typography variant="h4" component="h4"  gutterBottom >{patient?.name}</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        
                    <TableRow>
                    <Typography variant="body1"component="p">gender: {patient?.gender}</Typography> 
                    
                    </TableRow>
                    <TableRow>
                    <Typography variant="body1"component="p">ssh: {patient?.ssn} </Typography> 
                    
                    </TableRow>
                    <TableRow>
                    <Typography variant="body1"component="p">occupation: {patient?.occupation}</Typography> 

                    

                    </TableRow>
                
                          
                    </TableBody>
                </Table>
             </TableContainer>
         
        </div>
    )

}

export default PateintDetails