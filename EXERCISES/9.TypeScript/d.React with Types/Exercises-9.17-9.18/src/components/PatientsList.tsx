import { Table, TableBody, TableContainer, TableRow, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useStateValue } from "../state/state"
import { Patient } from "../types"
const PatientsList: React.FC = () => {
    const [{patients}, dispatch] = useStateValue()

    return (
        <div>
            <Typography variant="h4" component="h3" gutterBottom  >Patients List</Typography>
            <TableContainer>
                <Table>
                    <TableBody>
                        {
                            Object.values(patients).map((patient: Patient) => {
                                return (
                                    <TableRow key={patient.id}>
                                        <Link style={{color: 'black', fontSize: '20px', textDecoration: 'none'}} to={`/patients/${patient.id}`}>{patient.name}</Link>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>

          
        </div>
    )
}


export default PatientsList