import '../index.css'
import {Flex, Box, Spacer, Text} from "@chakra-ui/react"
import DeleteEmployee from "./DeleteEmployee.js"
import EditEmployee from './EditEmployee'


function Employee({emp, onDelete, onEdit, skills}) {


  return (

    <Flex rounded={3} p="5px" width="70vh" height="5vh" background="blue.800">
    <Box>
      <Text color='white'>{emp.firstName} {emp.lastName}</Text>
    </Box>
    <Spacer/>
      <EditEmployee emp={emp} onEdit={onEdit} skills={skills}/>
      <DeleteEmployee emp={emp} onDelete={onDelete}/>
    </Flex>

  );
}

export default Employee;