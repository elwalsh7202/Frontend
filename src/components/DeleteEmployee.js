import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    Button
  } from '@chakra-ui/react'

const DeleteEmployee = ({emp, onDelete}) => {

  return (
    <Popover>
        <PopoverTrigger>
            <Button m ='3px' height='30px' colorScheme='red' cursor="pointer">Delete</Button>
        </PopoverTrigger>
        <PopoverContent width="20vh">
        <PopoverArrow />
    <PopoverBody>Are you sure?</PopoverBody>
    <Button colorScheme='red' onClick={() => onDelete(emp.employeeID)}>Delete</Button>
    <PopoverCloseButton>CANCEL</PopoverCloseButton>
  </PopoverContent>
</Popover>

  )
}

export default DeleteEmployee
