import {Flex, Heading, Input, Center, Stack, Button, Box, Spacer, Text, Select, FormLabel} from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  const getAge = (dob) =>{
    var month_diff = Date.now() - new Date(dob);
    console.log(month_diff);
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970)
  }

const EditEmployee = ({onEdit, emp, skills}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editMode, setEditMode] = useState(false)
    const [employeeID, setEmployeeID] = useState(emp.employeeID)
    const [firstName, setFirstName] = useState(emp.firstName);
    const [lastName, setlastName] = useState(emp.lastName);
    const [email, setemail] = useState(emp.email);
    const [DOB, setDOB] = useState(emp.DOB);
    console.log(getAge(emp.DOB))
    const [age, setAge] = useState(getAge(emp.DOB));
    const [skillName, setSkillName] = useState(emp.skillName);
    const [active, setActive] = useState(emp.active);
    const [redToggle, setRedToggle] = useState(false)
    const[description, setDescription] = useState('')


    const setBday = (v)=>{
      setDOB(v);
      if(Date.parse(v) <= Date.now()){
        var currAge = getAge(v)
        setAge(currAge);
  
      }
    }

    const validateEmail = (e) =>{
      var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(e.match(validRegex)){
        return true
      }
      return false
    }
    
    const onMenuChange = (e) => {
      setSkillName(e.target.value);
      skills.forEach(skill => {
        if(skill.skillName === e.target.value){
          setDescription(skill.description)
        }
        
      });
    }
  
    const toggleEdit = () => {
        setEditMode(!editMode)
    }


    const close = () => {
      setRedToggle(false)
      setEditMode(false)
      skills.forEach(skill => {
        if(skill.skillName === skillName){
          setDescription(skill.description)
        }
        
      });
      onClose()
    }


    const onSubmit = (e) => {
        e.preventDefault();
        if(firstName === '' || lastName === '' || !validateEmail(email) || DOB === '' || skillName === '' || Date.parse(DOB) > Date.now()){
          setRedToggle(true)
        }
        else{
          onEdit({employeeID, firstName, lastName, email, DOB, skillName, active})
          close()

        }

    }

    const open = () => {
        setSkillName(emp.skillName)
        setFirstName(emp.firstName)
        setlastName(emp.lastName)
        setemail(emp.email)
        setDOB(emp.DOB)
        setAge(getAge(emp.DOB))
        setActive(emp.active)
        skills.forEach(skill => {
          if(skill.skillName === emp.skillName){
            setDescription(skill.description)
          }
          
        });
        onOpen()
    }
      return (
        <>
          <Button colorScheme='blue' m ='3px' height='30px' width="70px" onClick={open}>View</Button>
    
          <Modal isOpen={isOpen} onClose={close}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{emp.firstName} {emp.lastName}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
              <Stack>
                <Stack>
                {
                firstName === '' && redToggle ? <FormLabel color='red'>First Name</FormLabel> : <FormLabel>First Name</FormLabel>

                }
                <Input isDisabled={!editMode} placeholder='First Name' borderColor="gray" value={firstName} onChange={(e) => setFirstName(e.target.value)}></Input>
              </Stack>
              <Stack>
              {
                lastName === '' && redToggle ? <FormLabel color='red'>Last Name</FormLabel> : <FormLabel>Last Name</FormLabel>

                }
                <Input isDisabled={!editMode} placeholder='Last Name' borderColor="gray" value={lastName} onChange={(e) => setlastName(e.target.value)}></Input>
              </Stack>
              <Stack>
              {
                !validateEmail(email) && redToggle ? <FormLabel color='red'>Email</FormLabel> : <FormLabel>Email</FormLabel>

                }
                <Input isDisabled={!editMode} type='email' placeholder='Email' borderColor="gray" value={email} onChange={(e) => setemail(e.target.value)}></Input>
              </Stack>
              <Stack>
            {
                (DOB === '' || Date.parse(DOB) > Date.now()) && redToggle ? <FormLabel color='red'>Birthday</FormLabel> : <FormLabel>Birthday</FormLabel>

              }
              <Input isDisabled={!editMode} type="date" placeholder='Birthday' borderColor='gray' value={DOB} onChange={(e) => setBday(e.target.value)}></Input>
              <Text>Age: {age}</Text>
            </Stack>
              <Stack>
              {
                skillName === '' && redToggle ? <FormLabel color='red'>Skill Level</FormLabel> : <FormLabel>Skill Level</FormLabel>

                }
                <Select borderColor='gray' isDisabled={!editMode} value={skillName} onChange={(e)=>{onMenuChange(e)}}>
                <option value=''>Select</option>
                 {skills.map((s)=>(
                    <option key={s.skillName} value={s.skillName}>{s.skillName}</option>
                 ))}
              </Select>
              <Text>Description: {description}</Text>
              </Stack>
              <Checkbox isDisabled={!editMode} isChecked={active} colorScheme='green' onChange={(e) => setActive(e.currentTarget.checked)}>Active</Checkbox>
            </Stack>
              </ModalBody>
    
              <ModalFooter>
              <Button colorScheme='red' mr={3} onClick={close}>
                  Close
                </Button>
                {editMode ? <Button onClick={onSubmit} colorScheme="blue">Save</Button> : <Button onClick={toggleEdit} colorScheme="blue">Edit</Button> }
              
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
    }

export default EditEmployee