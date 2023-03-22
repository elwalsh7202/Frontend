import '../index.css'
import Employee from './Employee';
import {Stack} from "@chakra-ui/react"



function Employees({employees, onDelete, onEdit, skills}) {
  return (
    <Stack spacing={.5} overflow="auto">
      {employees.map((emp)=>(
            <Employee key={emp.employeeID} emp={emp} onDelete={onDelete} onEdit={onEdit} skills={skills}/>
           ))}
    </Stack>

  );
}

export default Employees;