import '../index.css'
import { useEffect, useState } from 'react'
import Employees from './Employees'
import { ChakraProvider } from '@chakra-ui/react'
import {Flex, Heading, Input, Center, Stack, Button, Box, Spacer, Text} from "@chakra-ui/react"
import AddEmployeeModal from './AddEmployeeModal';
import { BrowserRouter, Route, Routes, Navigate, useNavigate  } from "react-router-dom";


function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const[skillLevels, setSkillLevels] = useState([])
    const navigate = useNavigate();

    useEffect(()=>{
        const getEmployees = async () => {
            let response = await fetch("http://127.0.0.1:5000/employee", {
                method: "GET",
                credentials: 'include'
              }).then(async resp => {
                if(resp.ok){
                  let emps = await(resp).json().then(data =>{return data});
                  setEmployees(emps);

                }
                else{
                  alert('Unauthroized Access.  Please login again')
                  navigate('/')
                }
                
              }).catch(error => {
                alert(error)
                navigate("/")
              });
        }
        getEmployees();



        const getSkillLevels = async () => {
          let response = await fetch("http://127.0.0.1:5000/skilllevels", {
              method: "GET",
              credentials: 'include'
            }).then(async resp => {
              if(resp.ok){
                let skills = await(resp).json().then(data =>{return data});
                setSkillLevels(skills);

              }
              else{
                alert('Unauthroized Access.  Please login again')
                navigate('/')
              }
              
            }).catch(error => {
              alert(error)
              navigate("/")
            });
      }
      getSkillLevels();

    }, []);

    const deleteEmployee = async (id)=> {
        let response = await fetch("http://127.0.0.1:5000/employee/" + id, {
      method: "DELETE",
      headers: {
        'Origin': 'http://localhost:3000',
      },
      body:{
        "employeeID": id
      },
      credentials:"include"
    }).then(async resp => {
      if(resp.ok){
        setEmployees(employees.filter((emp) => emp.employeeID !== id))
      }
      else if(resp.status === 401){
        alert("Cannot complete action.  Unauthorized access.  Please login again.")
        navigate('/')
      }
      else{
        alert("something went wrong")
        navigate('/')
      }
    }).catch(error =>{
      alert(error)
      navigate('/')
    })
  
        

    }

    const addEmployee = async (emp) => {
        let response = await fetch("http://127.0.0.1:5000/employee", {
      method: "POST",
      headers: {
        'Origin': 'http://localhost:3000',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({  "firstName": emp.firstName,
    "lastName": emp.lastName,
    "email": emp.email,
    "DOB": emp.DOB,
    "active": emp.active,
    "skillName" : emp.skillName}),

      credentials:"include"
    }).then(async (resp)=> {
      if(resp.ok){
        let id = await resp.text();
        emp.employeeID = id;
        const newEmployee = {id, ...emp}
        setEmployees([...employees, newEmployee])
      }
      else if(resp.status === 401){
        alert("Cannot complete action.  Unauthorized access.  Please login again.")
        navigate('/')
      }
      else{
        alert("something went wrong")
        navigate('/')
      }
    

    }).catch(error=>{
      alert(error)
      navigate('/')
    })
    
    }

    const editEmployee = async (emp)=> {
          let response = await fetch("http://127.0.0.1:5000/employee/" + emp.employeeID, {
        method: "PUT",
        headers: {
          'Origin': 'http://localhost:3000',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({  "firstName": emp.firstName,
      "lastName": emp.lastName,
      "email": emp.email,
      "DOB": emp.DOB,
      "skillName": emp.skillName,
      "active": emp.active}),
  
        credentials:"include"
      }).then(async(resp)=>{
        if(resp.ok){
          let newEmp = await(resp).json().then(data =>{return data});
          employees.forEach(e => {
            if(e.employeeID === newEmp.employeeID){
              e.firstName = newEmp.firstName
              e.lastName = newEmp.lastName
              e.DOB = newEmp.DOB
              e.skillName = emp.skillName
              e.active = newEmp.active
              e.email = newEmp.email
            }
            setEmployees([...employees])

          });
        }
        else if(resp.status === 401){
          alert("Cannot complete action.  Unauthorized access.  Please login again.")
          navigate('/')
        }
        else{
          alert("something went wrong")
          navigate('/')
        }

      }).catch(error=>{
        alert(error)
        navigate('/')
      })

      

    }

     const logout = ()=>{
      fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      headers: {
        'Origin': 'http://localhost:3000',
    },
    credentials:'include'
    }).catch(error =>{
      alert("something went wrong.  Cookies not removed", error)
      navigate('/')
    })
      navigate('/')
     }

    return (

        <Flex bgGradient='linear(to-tl, black, blue.800)' dir='column' height="100vh" alignItems="center" justify="center">
          <Button colorScheme="pink" position='absolute' onClick={logout} top="0" right="0" m="3px" height="30" >Log Out</Button>
          <Stack>
            <Heading color="white" alignContent="center" justifyContent="center" Dashboard>Dashboard</Heading>
            <Flex bgGradient='linear(to-br, blue.200, pink.200)' height= "70vh" width="80vh" alignItems="center" direction="column" p={3} rounded={6} >
              <Flex direction="row">
                <Heading m={3} alignContent="center" justifyContent="center" fontSize={25}>Employees</Heading>
              </Flex>
              <Flex p="2px" bottom="8px" position="relative">
                <AddEmployeeModal onAdd={addEmployee} skills={skillLevels}/>
              </Flex>
              {employees.length > 0 ? <Employees employees={employees} onDelete = {deleteEmployee} onAdd={addEmployee} onEdit={editEmployee} skills={skillLevels} /> : <Center>No Employees</Center>}
              </Flex>
          
          </Stack>
        </Flex>


    );
}
  
  export default Dashboard;