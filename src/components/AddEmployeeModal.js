import { Input, Stack, Button, Text, FormControl, FormLabel, Select} from "@chakra-ui/react"
import { useDisclosure } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'
import {useState} from 'react'
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
    var age_dt = new Date(month_diff); 
    var year = age_dt.getUTCFullYear();
    return Math.abs(year - 1970)
  }

function AddEmployeeModal({onAdd, skills}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [DOB, setDOB] = useState('');
  const [age, setAge] = useState(0);
  const [redToggle, setRedToggle] = useState(false)
  const [description, setDescription] = useState('')
  const[skillName, setSkillName] = useState('');
  const [active, setActive] = useState(false);
  
  
  const setBday = (v)=>{
    setDOB(v);
    if(Date.parse(v) <= Date.now()){
      var currAge = getAge(v)
      setAge(currAge);
    }
  }

  const onMenuChange = (e)=>{
    setSkillName(e.target.value)
    skills.forEach(skill => {
      if(skill.skillName === e.target.value){
        setDescription(skill.description)
      }
    });
  }
  const close = ()=>{
    setRedToggle(false)
    setFirstName('')
    setlastName('')
    setemail('')
    setDOB('')
    setAge(0)
    setSkillName('')
    setActive(false)
    setDescription('')
    onClose()
  }

  const validateEmail = (e) =>{
    var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(e.match(validRegex)){
      return true
    }
    return false
  }
  const onSubmit = (e) => {
      e.preventDefault();
      if(firstName === '' || lastName === '' || !validateEmail(email) || DOB === '' || skillName === '' || Date.parse(DOB) > Date.now()){
        console.log(':)')
        setRedToggle(true)
      }
        
     else{
      onAdd({firstName, lastName, email, DOB, skillName, active})
      close()

     }

  }
    return (
      <FormControl >
        <Button rounded={3} m="1px" height = "30px" colorScheme="green" onClick={onOpen}>Add+</Button>
        <Modal isOpen={isOpen} onClose={close}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Employee</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Stack>
              <Stack>
              {
                firstName === '' && redToggle ? <FormLabel color='red'>First Name</FormLabel> : <FormLabel>First Name</FormLabel>

              }
              <Input placeholder='First Name' borderColor="gray" value={firstName} onChange={(e) => setFirstName(e.target.value)}></Input>
            </Stack>
            <Stack>
              {
                lastName === '' && redToggle ? <FormLabel color='red'>Last Name</FormLabel> : <FormLabel>Last Name</FormLabel>

              }
              
              <Input placeholder='Last Name' borderColor="gray" value={lastName} onChange={(e) => setlastName(e.target.value)}></Input>
            </Stack>
            <Stack>
            {
                !validateEmail(email) && redToggle ? <FormLabel color='red'>Email</FormLabel> : <FormLabel>Email</FormLabel>

              }
              <Input type='email' placeholder='Email' borderColor="gray" value={email} onChange={(e) => setemail(e.target.value)}></Input>
            </Stack>
            <Stack>
            {
                (DOB === '' || Date.parse(DOB) > Date.now()) && redToggle ? <FormLabel color='red'>Birthday</FormLabel> : <FormLabel>Birthday</FormLabel>

              }
              <Input type="date" placeholder='Birthday' borderColor='gray' value={DOB} onChange={(e) => setBday(e.target.value)}></Input>
              <Text>Age: {age}</Text>
            </Stack>
            <Stack>
              {
                skillName === '' && redToggle ? <FormLabel color='red'>Skill Level</FormLabel> : <FormLabel>Skill Level</FormLabel>

              }
              <Select borderColor='gray' value={skillName} onChange={(e)=>{onMenuChange(e)}}>
                <option value=''>Select</option>
                {skills.map((s)=>(
                    <option key={s.skillName} value={s.skillName}> {s.skillName} </option>
                 ))}
                 
              </Select>
              {
                skillName==="" ? <Text>Description:</Text> : <Text>Description: {description}</Text>
              }
              

            </Stack>
            <Checkbox fontWeight='bold' colorScheme='green' value={active} onChange={(e) => setActive(e.currentTarget.checked)}><FormLabel>Active</FormLabel></Checkbox>
          </Stack>
            </ModalBody>
  
            <ModalFooter>
            <Button rounded={3} colorScheme='red' mr={3} onClick={close}>
                Cancel
              </Button>
            <Button rounded={3} type='submit' onClick={onSubmit} colorScheme="green">Add</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </FormControl>
    )
  }

  export default AddEmployeeModal