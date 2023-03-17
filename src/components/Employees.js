import '../index.css'
import Employee from './Employee';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate, useNavigate  } from "react-router-dom";
import { useState } from 'react'
import {Flex, Heading, Input, Center, Stack, Button, Box} from "@chakra-ui/react"



function Employees({employees, onDelete, onEdit, skills}) {
  return (
    <Stack spacing={1} overflow="auto">
      {employees.map((emp)=>(
            <Employee key={emp.employeeID} emp={emp} onDelete={onDelete} onEdit={onEdit} skills={skills}/>
           ))}
    </Stack>

  );
}

export default Employees;